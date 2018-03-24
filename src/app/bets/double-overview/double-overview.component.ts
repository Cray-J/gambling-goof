import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Outcome } from '../outcome.enum';
import { BetService } from '../bet.service';
import { Subscription } from 'rxjs/Subscription';
import { Bet } from '../bet.model';

@Component({
  selector: 'app-double-overview',
  templateUrl: './double-overview.component.html',
  styleUrls: ['./double-overview.component.css']
})
export class DoubleOverviewComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['date', 'match', 'bookie', 'stake', 'odds', 'events', 'return'];
  dataSource = new MatTableDataSource<Bet>();
  private subscriptions: Subscription = new Subscription();

  total = 0;
  totalWins = 0;
  totalLoss = 0;
  outcomes = Outcome;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private betService: BetService) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.subscriptions.add(this.betService.dailyDoublesChanged.subscribe(
      (bets: Bet[]) => {
          this.dataSource.data = bets;

        this.total = 0;
        this.totalLoss = 0;
        this.totalWins = 0;

        // this.dataSource.data.forEach((bet => {
        //   if (bet.valueReturn != null) {
        //     this.total += bet.valueReturn;
        //   }
        //   if (Outcome[bet.outcome] === Outcome.win) {
        //     this.totalWins += 1;
        //   } else if (Outcome[bet.outcome] === Outcome.loss) {
        //     this.totalLoss += 1;
        //   }
        // }));
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  setStyle(bet: Bet) {
  /*  if (Outcome[bet.outcome] === Outcome.win || Outcome[bet.outcome] === Outcome.halfWin) {
      return 'lawngreen';
    } else if (Outcome[bet.outcome] === Outcome.loss || Outcome[bet.outcome] === Outcome.halfLoss) {
      return 'red';
    } else if (Outcome[bet.outcome] === Outcome.push || Outcome[bet.outcome] === Outcome.void) {
      return 'grey';
    }*/
  }

  getMatch(bet: Bet) {
    let testString = '';

    for (const temp of bet.bets) {
      testString += temp.match + ' - ' + temp.selection + ', ';
    }
    return testString.slice(0, testString.length - 2);

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
