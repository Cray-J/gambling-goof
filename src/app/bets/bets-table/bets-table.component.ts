import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { BetService } from '../../core/bet.service';
import { Subscription } from 'rxjs';
import {allOutcomes, Outcome} from '../../shared/model/outcome.enum';
import { NewBetDialogComponent } from '../new-bet-dialog/new-bet-dialog.component';
import { Bet } from '../../shared/model/bet.model';
import { Bookie } from '../../shared/model/bookie.enum';
import { BetType } from '../../shared/model/bet-type.enum';

@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-table.component.html',
  styleUrls: ['./bets-table.component.scss']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: false}) public sort: MatSort;
  public displayedColumns = ['date', 'match', 'selection', 'type', 'bookie', 'stake', 'odds', 'outcome', 'return', 'events'];
  public dataSource = new MatTableDataSource<Bet>();
  public outcomes = allOutcomes();
  public bookie = Bookie;
  public allOutcomes = Outcome;
  public type = BetType;
  private subscriptions: Subscription = new Subscription();
  private startDate = new Date('June 8 2019 00:01');

  constructor(private betService: BetService,
              public dialog: MatDialog) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.betService.betsChanged.subscribe((bets: Bet[]) => this.dataSource.data = bets);
  }

  updateValue(bet: Bet, outcome: Outcome) {
    bet.outcome = outcome;
    switch (bet.outcome) {
      case Outcome.win:
        bet.valueReturn = (bet.stake * bet.odds) - bet.stake;
        break;
      case Outcome.halfWin:
        bet.valueReturn = (bet.stake * bet.odds - bet.stake) / 2;
        break;
      case Outcome.halfLoss:
        bet.valueReturn = -bet.stake / 2;
        break;
      case Outcome.loss:
        bet.valueReturn = -bet.stake;
        break;
      case Outcome.awaiting:
        bet.valueReturn = 0;
        break;
      case Outcome.push:
        bet.valueReturn = 0;
        break;
      default:
        return null;
    }
    console.log(bet);
    console.log(bet.valueReturn);
    this.betService.updateBet(bet);
  }

  openDialog(element: Bet): void {
    const dialogRef = this.dialog.open(NewBetDialogComponent, {
      width: '700',
      data: {bet: element}
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
    this.dataSource.data.forEach(bet => val += bet.valueReturn);
    return val;
  }

  public totalDays(): number {
    const diff = +new Date() - +this.startDate;
    return Math.ceil(diff  / 1000 / 60 / 60 / 24);
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
