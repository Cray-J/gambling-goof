import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { BetService } from '../../core/bet.service';
import { Subscription } from 'rxjs';
import { Outcome } from '../../shared/model/outcome.enum';
import { NewBetDialogComponent } from '../new-bet-dialog/new-bet-dialog.component';
import { Bet } from '../../shared/model/bet.model';
import { $enum } from 'ts-enum-util';
import { ToText } from '../../shared/model/to-text';

@Component({
  selector: 'bets-overview',
  templateUrl: './bets-table.component.html',
  styleUrls: ['./bets-table.component.scss']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: false }) public sort: MatSort;
  public displayedColumns = [
    'date',
    'match',
    'selection',
    'confidence',
    'bookie',
    'stake',
    'odds',
    'outcome',
    'return',
    'events'
  ];
  public dataSource = new MatTableDataSource<Bet>();
  public outcomes = $enum(Outcome).getKeys();
  public outcome = Outcome;
  public toText = ToText;
  public confidence = [1, 2, 3, 4, 5];
  private subscriptions: Subscription = new Subscription();
  private startDate = new Date('January 1 2020 00:01');

  constructor(private betService: BetService, public dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.betService.betsChanged.subscribe((bets: Bet[]) => (this.dataSource.data = bets));
  }

  updateValue(bet: Bet, outcome: Outcome) {
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
    this.betService.updateBet(bet);
  }

  openDialog(element: Bet): void {
    const dialogRef = this.dialog.open(NewBetDialogComponent, {
      width: '900',
      data: { bet: element }
    });

    dialogRef.afterClosed().subscribe((bet: Bet) => {
      console.log(bet);
      this.updateValue(bet, bet.outcome);
      this.betService.updateBet(bet);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public total(): number {
    let val = 0;
    this.dataSource.data.forEach(bet => (val += bet.valueReturn));
    return val;
  }

  public totalDays(): number {
    const diff = +new Date() - +this.startDate;
    return Math.ceil(diff / 1000 / 60 / 60 / 24);
  }

  public calculateROI(): number {
    let invested = 0;
    let returned = 0;
    this.dataSource.data.forEach(bet => {
      invested += bet.stake;
      returned += bet.valueReturn;
    });
    return invested / returned;
  }
}
