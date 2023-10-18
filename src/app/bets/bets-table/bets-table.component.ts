import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Outcome } from '../../shared/model/outcome.enum';
import { Bet } from '../../shared/model/bet.model';
import { $enum } from 'ts-enum-util';
import { ToText } from '../../shared/model/to-text';
import { Day } from '../../shared/model/day.model';
import { DayService } from '../../core/day.service';
import { NewBetSlipDialogComponent } from "../new-betSlip-dialog/new-betSlip-dialog.component";

export class DataRow {
  constructor(public day: Day, public match: any, public bet: Bet) {}
}

@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-table.component.html',
  styleUrls: ['./bets-table.component.scss']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) public sort: MatSort;
  public displayedColumns = [
    'date',
    'match',
    'selection',
    'bookie',
    'stake',
    'odds',
    'outcome',
    'return',
    'events'
  ];
  public dataSource = new MatTableDataSource<DataRow>();
  public outcomes = $enum(Outcome).getKeys();
  public outcome = Outcome;
  public toText = ToText;
  private subscriptions: Subscription = new Subscription();
  private startDate = new Date('June 22 2020 00:01');

  constructor(private dayService: DayService, public dialog: MatDialog) {}

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }

  public ngOnInit() {
    this.dayService.daysChanged.subscribe((days: Day[]) => {
      const bets = [];
      days.forEach((d: Day) =>
        d.matches.forEach((m: any) => m.bets.forEach((b: Bet) => {
          bets.push(new DataRow(d, m, b))
        }))
      );
      this.dataSource.data = bets;
    });
  }

  public updateValue(row: DataRow, outcome: Outcome) {
    row.bet.outcome = outcome;
    row.bet.valueReturn = $enum.mapValue(outcome).with({
      [Outcome.win]: row.bet.stake * row.bet.odds - row.bet.stake,
      [Outcome.halfWin]: (row.bet.stake * row.bet.odds - row.bet.stake) / 2,
      [Outcome.push]: 0,
      [Outcome._void]: 0,
      [Outcome.awaiting]: null,
      [Outcome.halfLoss]: -row.bet.stake / 2,
      [Outcome.loss]: -row.bet.stake
    });
    let val = 0;
    row.day.matches.forEach(m => (val += m.bets.reduce((a, b) => a + b.valueReturn, 0)));
    row.day.result = val;
    this.dayService.update(row.day);
  }

  public openDialog(row: DataRow): void {
    this.dialog
      .open(NewBetSlipDialogComponent, {
        width: '900',
        data: [row.day, row.match, row.bet]
      })
      .afterClosed()
      .subscribe((bet: Bet) => this.updateValue(row, bet.outcome));
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public total(): number {
    return this.dataSource.data.reduce(
      (value: number, row: DataRow) => value + row.bet.valueReturn,
      0
    );
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
