import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Outcome } from '../outcome.enum';
import { BetService } from '../bet.service';
import { Subscription } from 'rxjs/Subscription';
import { BetSelection } from '../bet-selection.model';
import { expandAnimation } from '../expand-animation';
import { MultiBet } from '../bet.model';


@Component({
  selector: 'app-double-overview',
  templateUrl: './double-overview.component.html',
  styleUrls: ['./double-overview.component.scss'],
  animations: [expandAnimation],
})
export class DoubleOverviewComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['date', 'match', 'bookie', 'stake', 'odds', 'events', 'return'];
  dataSource = new MatTableDataSource<MultiBet>();
  private subscriptions: Subscription = new Subscription();
  outcomes = Outcome;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private expandedBets: MultiBet[] = [];
  public isMultiBet = (_, row: MultiBet) => row.bets.length > 1;

  constructor(private betService: BetService) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.subscriptions.add(this.betService.multiBetsChanged.subscribe(
      (bets: MultiBet[]) => {
          this.dataSource.data = bets;
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }



  setStyle(bet: MultiBet) {
    if (bet.valueReturn > 0) {
      return 'lawngreen';
    } else if (bet.valueReturn < 0) {
      return 'red';
    } else if (bet.valueReturn === 0) {
      return 'grey';
    }
  }

  getMatch(bet: MultiBet) {
    let testString = '';

    for (const temp of bet.bets) {
      testString += temp.match + ', ';
    }
    return testString.slice(0, testString.length - 2);

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;

}

  onRowClick(betRow: MultiBet) {
    console.log('click event');
    const index: number = this.expandedBets.indexOf(betRow);
    if (index > -1) {
      this.expandedBets.splice(index, 1);
    } else {
      this.expandedBets.push(betRow);
    }
    console.log(this.expandedBets);
  }

  isExpanded(betRow: MultiBet): boolean {
    // console.log('Checking for expanded row');
    return this.expandedBets.some(bet => bet === betRow);
  }


  residesInAnExpandedBet(betRow: BetSelection): boolean {
    // console.log('Checking for resides in expanded bet');
    return true;
  }
}
