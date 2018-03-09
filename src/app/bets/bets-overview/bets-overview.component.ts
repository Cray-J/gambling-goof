import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Bet} from '../bet.model';
import {BetService} from '../bet.service';
import {Subscription} from 'rxjs/Subscription';
import {Outcome} from '../outcome.enum';
import {BetType} from "../bet-type.enum";

@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-overview.component.html',
  styleUrls: ['./bets-overview.component.css']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'match', 'selection', 'bookie', 'stake', 'odds', 'outcome', 'return'];
  dataSource = new MatTableDataSource<Bet>();
  private exChangedSubscription: Subscription;
  private currentBetType: Subscription;
  bets: Bet[];
  total = 0;
  totalWins = 0;
  totalLoss = 0;

  outcomes = Outcome;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private betService: BetService) { }

  ngOnInit() {
    this.exChangedSubscription = this.betService.dailyWebSinglesChanged.subscribe(
      (bets: Bet[]) => {
        this.dataSource.data = bets;
        this.total = 0;
        this.totalLoss = 0;
        this.totalWins = 0;
        bets.forEach(bet => {
          if (bet.valueReturn != null) {
            this.total += bet.valueReturn;
          }
          if (Outcome[bet.outcome] === Outcome.win) {
            this.totalWins += 1;
          } else if (Outcome[bet.outcome] === Outcome.loss) {
            this.totalLoss += 1;
          }
        });
      }
    );
    this.betService.fetchDailyWebBets();

    this.betService.currentTab.subscribe(
      (tab: string) => {
        console.log('GOT NEW TAB: ' + tab);
      }
    );

    this.currentBetType = this.betService.currentSelectedBetTypeChanged.subscribe((typeSelected: string) => {
      console.log('bettype changed to: ' + typeSelected);
    });
  }

  updateBet(bet: Bet) {
    console.log("Updating bet");
    console.log(bet.id);
  }

  ngOnDestroy() {
    this.exChangedSubscription.unsubscribe();
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setStyle(bet: Bet) {
    if (Outcome[bet.outcome] === Outcome.win || Outcome[bet.outcome] === Outcome.halfWin) {
      return 'lawngreen';
    } else if (Outcome[bet.outcome] === Outcome.loss || Outcome[bet.outcome] === Outcome.halfLoss) {
      return 'red';
    } else if (Outcome[bet.outcome] === Outcome.push || Outcome[bet.outcome] === Outcome.void) {
      return 'grey';
    }

  }


}
