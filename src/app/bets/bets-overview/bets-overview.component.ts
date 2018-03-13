import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, Sort, MatDialog} from '@angular/material';
import {Bet} from '../bet.model';
import {BetService} from '../bet.service';
import {Subscription} from 'rxjs/Subscription';
import {Outcome} from '../outcome.enum';
import {BetType} from '../bet-type.enum';
import {NewBetDialogComponent} from "../new-bet-dialog/new-bet-dialog.component";

@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-overview.component.html',
  styleUrls: ['./bets-overview.component.css']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'match', 'selection', 'bookie', 'stake', 'odds', 'events', 'outcome', 'return'];
  dataSource = new MatTableDataSource<Bet>();
  private subscriptions: Subscription = new Subscription();

 // dailySingles: Bet[];
 // dailyWebSingles: Bet[];
  total = 0;
  totalWins = 0;
  totalLoss = 0;
  outcomes = Outcome;

  animal: string;
  name: string;

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
   /* this.dailyWebSinglesSub = this.betService.dailyWebSinglesChanged.subscribe(
      (bets: Bet[]) => {
//        let dataBets = bets.slice();
        //      dataBets.sort(betDateComparator());
        // this.sortedData = dataBets.slice();
        //this.dailyWebSingles = bets;
      }
    );
    this.dailySinglesSub = this.betService.dailySinglesChanged.subscribe(
      (bets: Bet[]) => {
        //this.dailySingles = bets;
      }
    );*/
    this.betService.fetchDailyWebBets();
    this.betService.fetchDailyBets();

    this.subscriptions.add(this.betService.currentTab.subscribe(
      (tab: string) => {
        if (tab === 'Daily Web Single') {
          this.dataSource.data = this.betService.getDailyWebBets();
        } else if (tab === 'Daily Single') {
          this.dataSource.data = this.betService.getDailyBets();
        }

        this.total = 0;
        this.totalLoss = 0;
        this.totalWins = 0;

        this.dataSource.data.forEach((bet => {
          if (bet.valueReturn != null) {
            this.total += bet.valueReturn;
          }
          if (Outcome[bet.outcome] === Outcome.win) {
            this.totalWins += 1;
          } else if (Outcome[bet.outcome] === Outcome.loss) {
            this.totalLoss += 1;
          }
        }));
      }
    ));
  }

  updateValue() {
    console.log('updating value');
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(NewBetDialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      console.log(this.animal);
    });
  }

/*
    updateBet(bet: Bet) {
      console.log(bet.id);
    }
*/
    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
/*
    doFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
*/
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
