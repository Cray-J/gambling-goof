import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Bet } from '../bet.model';
import { BetService } from '../bet.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-overview.component.html',
  styleUrls: ['./bets-overview.component.css']
})
export class BetsOverviewComponent implements OnInit {
  displayedColumns = ['match', 'selection'];
  dataSource = new MatTableDataSource<Bet>();
  private exChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private betService: BetService) { }

  ngOnInit() {
    this.exChangedSubscription = this.betService.dailyBetsChanged.subscribe(
      (bets: Bet[]) => {
        this.dataSource.data = bets;
      }
    );
    // this.dataSource.data = this.betService.getBets();
    console.log('hey');
    console.log(this.dataSource.data);
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

