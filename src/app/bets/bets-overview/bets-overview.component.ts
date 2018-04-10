import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { BetService } from '../bet.service';
import { Subscription } from 'rxjs/Subscription';
import { Outcome } from '../outcome.enum';
import { NewBetDialogComponent } from '../new-bet-dialog/new-bet-dialog.component';
import { CalculationsService } from '../calculations.service';
import { SingleBet } from '../singlebet.model';


@Component({
  selector: 'app-bets-overview',
  templateUrl: './bets-overview.component.html',
  styleUrls: ['./bets-overview.component.css']
})
export class BetsOverviewComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'match', 'selection', 'bookie', 'stake', 'odds', 'events', 'outcome', 'return'];
  dataSource = new MatTableDataSource<SingleBet>();
  private subscriptions: Subscription = new Subscription();

  total = 0;
  totalWins = 0;
  totalLoss = 0;
  outcomes = Outcome;


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
    console.log("hary");
    this.dataSource.data = this.betService.getSingleBets();
    let subs = this.betService.singleBetsChanged;
    this.betService.singleBetsChanged.subscribe((bets: SingleBet[]) => {
      this.dataSource.data = bets;
    });
    // this.subscriptions.add();
    console.log(this.dataSource.data);
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

  updateValue(bet: SingleBet) {
    this.calculationService.determineReturnsForSingle(bet);
    this.betService.updateBet(bet);
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
