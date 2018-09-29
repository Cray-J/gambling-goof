import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { BetService } from '../bet.service';
import { Subscription } from 'rxjs';
import { Outcome } from '../outcome.enum';
import { NewBetDialogComponent } from '../new-bet-dialog/new-bet-dialog.component';
import { CalculationsService } from '../calculations.service';
import { Bet } from '../bet.model';
import { BetType } from '../bet-type.enum';
import { Bookie } from '../bookie.enum';


@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-overview.component.html',
  styleUrls: ['./bets-overview.component.css']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'match', 'selection', 'bookie', 'stake', 'odds', 'events', 'outcome', 'return'];
  dataSource = new MatTableDataSource<Bet>();
  private subscriptions: Subscription = new Subscription();
  outcomes = Outcome;
  betType = BetType;
  bookie = Bookie;

  seasonBets: BetTypeStats = new BetTypeStats();
  flatStakeBets: BetTypeStats = new BetTypeStats();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private betService: BetService,
              private calculationService: CalculationsService,
              public dialog: MatDialog) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.betService.betsChanged.subscribe((bets: Bet[]) => {
      this.dataSource.data = bets;
      this.seasonBets = new BetTypeStats();
      this.flatStakeBets = new BetTypeStats();
      bets.forEach(bet => {
        if (BetType[bet.betType] === BetType.flatStake) {
          this.flatStakeBets.bets.push(bet);
          this.setBet(this.flatStakeBets, bet);
        } else if (BetType[bet.betType] === BetType.season) {
          this.seasonBets.bets.push(bet);
          this.setBet(this.seasonBets, bet);
        }
      });
    });
  }

  setBet(betStats: BetTypeStats, bet: Bet) {
    betStats.totalWin += bet.valueReturn;
    betStats.totalStaked += bet.stake;

    const outcome = Outcome[bet.outcome];
    if (outcome === Outcome.win) {
      betStats.wins += 1;
    } else if (outcome === Outcome.halfWin) {
      betStats.halfWins += 1;
    } else if (outcome === Outcome.halfLoss) {
      betStats.halfLoss += 1;
    } else if (outcome === Outcome.loss) {
      betStats.loss += 1;
    } else if (outcome === Outcome.push || outcome === Outcome.void) {
      betStats.voidPush += 1;
    } else if (outcome === Outcome.awaiting) {
      betStats.awaiting += 1;
    }
  }

  totalWins() {
    return this.seasonBets.totalWins() + this.flatStakeBets.totalWins();
  }

  totalReturn() {
    return this.seasonBets.totalWin + this.flatStakeBets.totalWin;
  }

  totalStaked() {
    return this.seasonBets.totalStaked + this.flatStakeBets.totalStaked;
  }

  updateValue(bet: Bet) {
    this.calculationService.determineReturnsForSingle(bet);
    this.betService.updateBet(bet);
  }

  setFilter(val) {
    if (val === 'all') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = val;
    }
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

export class BetTypeStats {
  wins = 0;
  halfWins = 0;
  loss = 0;
  halfLoss = 0;
  voidPush = 0;
  awaiting = 0;
  totalWin = 0;
  totalStaked = 0;
  bets: Bet[] = [];

  totalWins() {
    return this.wins + this.halfWins;
  }

  roi() {
    return this.totalWin / this.totalStaked * 100;
  }

  winRatio() {
    return (this.wins + this.halfWins) / (this.bets.length - this.voidPush - this.awaiting) * 100;
  }
}
