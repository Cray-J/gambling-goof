import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Bet } from '../bet.model';
import { BetService } from '../bet.service';
import { Subscription } from 'rxjs/Subscription';
import {Outcome} from '../outcome.enum';

@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-overview.component.html',
  styleUrls: ['./bets-overview.component.css']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'match', 'selection', 'bookie', 'stake', 'odds', 'outcome', 'return'];
  dataSource = new MatTableDataSource<Bet>();
  private exChangedSubscription: Subscription;
  bets: Bet[];

  outcomes: Outcome;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private betService: BetService) { }

  ngOnInit() {
    this.exChangedSubscription = this.betService.dailyWebSinglesChanged.subscribe(
      (bets: Bet[]) => {
        this.dataSource.data = bets;
      }
    );
    this.betService.fetchDailyWebBets();
  }

  ngOnDestroy() {
    this.exChangedSubscription.unsubscribe();
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setStyle() {
    return '"background-color:" "green"';

//    if (bet.outcome === 'win') {
    // } else if (bet.outcome === 'loss') {
    // return 'red';
    // }
  }

}
