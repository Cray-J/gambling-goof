import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Bet } from '../bet.model';
import { BetService } from '../bet.service';
import { Subscription } from 'rxjs/Subscription';
import { Outcome } from '../outcome.enum';
import { NewBetDialogComponent } from '../new-bet-dialog/new-bet-dialog.component';
import { CalculationsService } from '../calculations.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-overview.component.html',
  styleUrls: ['./bets-overview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'match', 'selection', 'bookie', 'stake', 'odds', 'events', 'outcome', 'return'];
  dataSource = new MatTableDataSource<Bet>();
  private subscriptions: Subscription = new Subscription();

  total = 0;
  totalWins = 0;
  totalLoss = 0;
  outcomes = Outcome;

  animal: string;
  name: string;

  isExpansionDetailRow = (i, row) => row.hasOwnProperty('detailRow');
  //isExpansionDetailRow = true;
  expandedElement: any;

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
    this.subscriptions.add(this.betService.currentTab.subscribe(
      (tab: string) => {
        if (tab === 'Daily Web Single') {
          this.dataSource.data = this.betService.getDailyWebBets();
        } else if (tab === 'Daily Single') {
          this.dataSource.data = this.betService.getDailyBets();
        } else if (tab === 'Season Bets') {
          this.dataSource.data = this.betService.getSeasonBets();
        } else if (tab === 'Unit Bets') {
          this.dataSource.data = this.betService.getUnitBets();
        } else if (tab === 'Minor Plays') {
          this.dataSource.data = this.betService.getMinorBets();
        }

        this.total = 0;
        this.totalLoss = 0;
        this.totalWins = 0;

        this.dataSource.data.forEach((bet => {
          if (bet.valueReturn != null) {
            this.total += bet.valueReturn;
          }
       /*   if (Outcome[bet.outcome] === Outcome.win) {
            this.totalWins += 1;
          } else if (Outcome[bet.outcome] === Outcome.loss) {
            this.totalLoss += 1;
          }*/
        }));
      }
    ));
  }

  updateValue(bet: Bet) {
    this.calculationService.determineReturns(bet);
    this.betService.updateBet(bet);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(NewBetDialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getMatch(bet: Bet) {
    let testString = '';

    for (const temp of bet.bets) {
      testString += temp.match + ', ';
    }
    return testString.slice(0, testString.length - 2);
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
