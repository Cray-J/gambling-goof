import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Outcome } from '../../shared/model/outcome.enum';
import { NewBetDialogComponent } from '../new-bet-dialog/new-bet-dialog.component';
import { Bet } from '../../shared/model/bet.model';
import { $enum } from 'ts-enum-util';
import { ToText } from '../../shared/model/to-text';
import { Day } from '../../shared/model/day.model';
import { Match } from '../../shared/model/match.model';
import { DayService } from '../../core/day.service';

export class DataRow {
  constructor(public day: Day, public match: Match, public bet: Bet) {
  }
}

@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-table.component.html',
  styleUrls: ['./bets-table.component.scss']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: false }) public sort: MatSort;
  public displayedColumns = ['date', 'match', 'selection', 'bookie', 'stake', 'odds', 'outcome', 'return', 'events'];
  public dataSource = new MatTableDataSource<DataRow>();
  public outcomes = $enum(Outcome).getKeys();
  public outcome = Outcome;
  public toText = ToText;
  private subscriptions: Subscription = new Subscription();
  private startDate = new Date('March 8 2020 00:01');

  constructor(private dayService: DayService,
              public dialog: MatDialog) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dayService.daysChanged.subscribe((days: Day[]) => {
      const bets = [];
      days.forEach(d => d.matches.forEach(m => m.bets.forEach(b => bets.push(new DataRow(d, m, b)))));
      this.dataSource.data = bets;
    });
  }

  updateValue(row: DataRow, outcome: Outcome) {
    row.bet.outcome = outcome;
    row.bet.valueReturn = $enum.mapValue(outcome).with({
      [Outcome.win]: (row.bet.stake * row.bet.odds) - row.bet.stake,
      [Outcome.halfWin]: (row.bet.stake * row.bet.odds - row.bet.stake) / 2,
      [Outcome.push]: 0,
      [Outcome._void]: 0,
      [Outcome.awaiting]: null,
      [Outcome.halfLoss]: -row.bet.stake / 2,
      [Outcome.loss]: -row.bet.stake
    });
    let val = 0;
    row.day.matches.forEach(m => {
      m.bets.forEach(b => val += b.valueReturn);
    });
    row.day.result = val;
    // row.day.calculateResult();
    console.log('updating: ', row.day);
    this.dayService.update(row.day);
  }

  openDialog(row: DataRow): void {
    const dialogRef = this.dialog.open(NewBetDialogComponent, {
      width: '900',
      data: [row.day, row.match, row.bet]
    });

    dialogRef.afterClosed().subscribe((bet: Bet) => {
      console.log(bet);
      this.updateValue(row, bet.outcome);
      // this.betService.updateBet(bet);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public total(): number {
    let val = 0;
    this.dataSource.data.forEach(bet => val += bet.bet.valueReturn);
    return val;
  }

  public totalDays(): number {
    const diff = +new Date() - +this.startDate;
    return Math.ceil(diff  / 1000 / 60 / 60 / 24);
  }

  public calculateROI(): number {
    let invested = 0;
    let returned = 0;
    this.dataSource.data.forEach(row => {
      invested += row.bet.stake;
      returned += row.bet.valueReturn;
    });
    return invested / returned;
  }
}
