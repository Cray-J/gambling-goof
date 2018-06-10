import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { BetService } from '../bet.service';
import { Subscription } from 'rxjs/Subscription';
import { allOutcomes, Outcome } from '../outcome.enum';
import { NewBetDialogComponent } from '../new-bet-dialog/new-bet-dialog.component';
import { CalculationsService } from '../calculations.service';
import { SingleBet } from '../singlebet.model';
import { BetType } from '../bet-type.enum';
import { Bookie } from '../bookie.enum';


@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-overview.component.html',
  styleUrls: ['./bets-overview.component.css']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'match', 'selection', 'bookie', 'stake', 'odds', 'type', 'events', 'outcome', 'return'];
  dataSource = new MatTableDataSource<SingleBet>();
  private subscriptions: Subscription = new Subscription();
  outcomes = Outcome;
  betType = BetType;
  bookie = Bookie;
  bet365Balance = 0;

  seasonBets: SingleBet[] = [];
  flatStakeBets: SingleBet[] = [];



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
    this.betService.betsChanged.subscribe((bets: SingleBet[]) => {
      this.dataSource.data = bets;
      bets.forEach(bet => {
        if (BetType[bet.betType] === BetType.flatStake) {
          this.flatStakeBets.push(bet);
        } else if (BetType[bet.betType] === BetType.season) {
          this.seasonBets.push(bet);
        }
      });
    });
  }

  findOutcome(outcome: Outcome, betType: BetType) {
    let total = 0;
    const type: SingleBet[] = betType === BetType.flatStake ? this.flatStakeBets
                                                             : this.seasonBets;
      type.forEach( bet => {
        if (Outcome[bet.outcome] === outcome) {
          total += 1;
        }
      });
    return total;
  }

  totalWins() {
    let wins = 0;
    let halfWins = 0;
    this.dataSource.data.forEach(bet => {
      if (Outcome[bet.outcome] === Outcome.win) {
        wins++;
      } else if (Outcome[bet.outcome] === Outcome.halfWin) {
        halfWins++;
      }
    });
    return wins + halfWins;
  }

  totalReturn() {
    let total = 0;
    this.dataSource.data.forEach(bet => total += bet.valueReturn);
    return total;
  }

  totalStaked() {
    let total = 0;
    this.dataSource.data.forEach(bet => total += bet.stake);
    return total;
  }

  updateValue(bet: SingleBet) {
    const oldVal = bet.valueReturn;

    if (oldVal < 0) {
      this.bet365Balance += (-1 * oldVal);
    } else if ( oldVal > 0) {
      this.bet365Balance -= oldVal;
    }

    this.calculationService.determineReturnsForSingle(bet);
    this.bet365Balance += bet.valueReturn;


    this.betService.updateBet(bet);
  }

  setFilter(val) {
    if (val === 'all') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = val;
    }
    console.log(val);
  }


  openDialog(element: SingleBet): void {
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

  setStyle(bet: SingleBet) {
    if (bet.valueReturn > 0) {
      return 'lawngreen';
    } else if (bet.valueReturn < 0) {
      return 'red';
    } else if (bet.valueReturn === 0) {
      return 'grey';
    }
  }

}
