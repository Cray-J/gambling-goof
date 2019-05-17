import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { BetService } from '../../core/bet.service';
import { Subscription } from 'rxjs';
import {allOutcomes, Outcome} from '../../shared/model/outcome.enum';
import { NewBetDialogComponent } from '../new-bet-dialog/new-bet-dialog.component';
import { Bet } from '../../shared/model/bet.model';
import { Bookie } from '../../shared/model/bookie.enum';

@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-table.component.html',
  styleUrls: ['./bets-table.component.scss']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'match', 'selection', 'bookie', 'stake', 'odds', 'events', 'outcome', 'return'];
  dataSource = new MatTableDataSource<Bet>();
  private subscriptions: Subscription = new Subscription();
  outcomes = allOutcomes();
  bookie = Bookie;
  startDate = new Date("May 16 2019 12:00");

  @ViewChild(MatSort) sort: MatSort;

  constructor(private betService: BetService,
              public dialog: MatDialog) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
        bet.valueReturn = (bet.stake * bet.odds) / 2 - bet.stake;
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

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public total() {
    let val = 0;
    this.dataSource.data.forEach(bet => val += bet.valueReturn);
    return val;
  }

  public totalDays() {
    return new Date().getDate() - this.startDate.getDate();
  }

  setStyle(bet: Bet) {
    if (bet.valueReturn > 0) {
      return 'lawngreen';
    } else if (bet.valueReturn < 0) {
      return 'red';
    } else if (bet.valueReturn === 0) {
      return 'grey';
    }
  }

}
