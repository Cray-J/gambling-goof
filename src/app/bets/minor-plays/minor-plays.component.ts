import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Bet } from '../bet.model';
import { Subscription } from 'rxjs/Subscription';
import { Outcome } from '../outcome.enum';
import { BetService } from '../bet.service';
import { CalculationsService } from '../calculations.service';

@Component({
  selector: 'app-minor-plays',
  templateUrl: './minor-plays.component.html',
  styleUrls: ['./minor-plays.component.css']
})
export class MinorPlaysComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['date', 'match', 'selection', 'bookie', 'stake', 'odds', 'events', 'outcome', 'return'];
  dataSource = new MatTableDataSource<Bet>();
  private exChangedSubscription: Subscription;
  private currentBetType: Subscription;
  bets: Bet[];
  total = 0;
  totalWins = 0;
  totalLoss = 0;

  outcomes = Outcome;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private betService: BetService,
              private calculationService: CalculationsService) {
  }

  ngOnInit() {
    this.exChangedSubscription = this.betService.minorPlaysChanged.subscribe(
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
        console.log(bets);

      }
    );
    this.betService.fetchMinorPlays();

    this.betService.currentTab.subscribe(
      (tab: string) => {
        console.log('GOT NEW TAB: ' + tab);
      }
    );

    // this.currentBetType = this.betService.currentSelectedBetTypeChanged.subscribe((typeSelected: string) => {
    //   console.log('bettype changed to: ' + typeSelected);
    // });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  updateBet(bet: Bet) {
    console.log('Updating bet');
    this.calculationService.determineReturns(bet);
    console.log(bet.outcome);
    this.betService.updateBet(bet);
  }

  ngOnDestroy() {
    this.exChangedSubscription.unsubscribe();
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
