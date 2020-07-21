import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { $enum } from 'ts-enum-util';
import { Outcome } from '../../shared/model/outcome.enum';
import { ToText } from '../../shared/model/to-text';
import { DayService } from '../../core/day.service';
import { MatDialog } from '@angular/material/dialog';
import { Day } from '../../shared/model/day.model';
import { NewBetDialogComponent } from '../new-bet-dialog/new-bet-dialog.component';
import { Bet } from '../../shared/model/bet.model';
import { DataRow } from '../bets-table/bets-table.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { SeasonBetService } from '../../core/season-bet.service';
import { SeasonBet } from '../../shared/model/season-bet.model';

@Component({
  selector: 'season-bet-table',
  templateUrl: './season-bet-table.component.html',
  styleUrls: ['./season-bet-table.component.scss']
})
export class SeasonBetTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) public sort: MatSort;
  public displayedColumns = [
    'date',
    'selection',
    'bookie',
    'stake',
    'outcome',
    'return'
  ];
  public dataSource = new MatTableDataSource<SeasonBet>();
  public outcomes = $enum(Outcome).getKeys();
  public outcome = Outcome;
  public toText = ToText;
  private subscriptions: Subscription = new Subscription();

  constructor(private seasonBetService: SeasonBetService, public dialog: MatDialog) {}

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }

  public ngOnInit() {
    this.seasonBetService.betsChanged.subscribe((bets: SeasonBet[]) => {
      console.log(bets);
      this.dataSource.data = bets
    });
  }

  public updateValue(bet: Bet, outcome: Outcome) {
    bet.outcome = outcome;
    bet.valueReturn = $enum.mapValue(outcome).with({
      [Outcome.win]: bet.stake * bet.odds - bet.stake,
      [Outcome.halfWin]: (bet.stake * bet.odds - bet.stake) / 2,
      [Outcome.push]: 0,
      [Outcome._void]: 0,
      [Outcome.awaiting]: null,
      [Outcome.halfLoss]: -bet.stake / 2,
      [Outcome.loss]: -bet.stake
    });
    this.seasonBetService.updateBet(bet);
  }

  public openDialog(row: DataRow): void {
    // this.dialog
    //   .open(NewBetDialogComponent, {
    //     width: '900',
    //     data: [row.day, row.match, row.bet]
    //   })
    //   .afterClosed()
    //   .subscribe((bet: Bet) => this.updateValue(row, bet.outcome));
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
