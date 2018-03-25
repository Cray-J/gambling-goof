import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Outcome } from '../outcome.enum';
import { BetService } from '../bet.service';
import { Subscription } from 'rxjs/Subscription';
import { Bet } from '../bet.model';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-double-overview',
  templateUrl: './double-overview.component.html',
  styleUrls: ['./double-overview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DoubleOverviewComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['date', 'match', 'bookie', 'stake', 'odds', 'events', 'return'];
  dataSource = new MatTableDataSource<Bet>();
  private subscriptions: Subscription = new Subscription();
  outcomes = Outcome;
  @ViewChild(MatSort) sort: MatSort;
  expandedElement: any;
  isExpansionDetailRow = (i, row) => row.hasOwnProperty('detailRow');

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
          console.log(bets);
      }
    ));
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

  getMatch(bet: Bet) {
    let testString = '';

    for (const temp of bet.bets) {
      console.log(temp);
      testString += temp.match + ', ';
    }
    return testString.slice(0, testString.length - 2);

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
