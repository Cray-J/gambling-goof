import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bet } from '../shared/model/bet.model';
import { BetService } from '../core/bet.service';
import { NewGoalDialogComponent } from '../bets/new-goal-dialog/new-goal-dialog.component';
import { GoalService } from '../core/goal.service';
import { NewDayDialogComponent } from '../bets/new-day-dialog/new-day-dialog.component';
import { DayService } from '../core/day.service';
import { SeasonBetService } from '../core/season-bet.service';
import { NewSeasonBetDialogComponent } from '../bets/new-season-bet-dialog/new-season-bet-dialog.component';
import { BetDialogComponent } from '../bets/bet-dialog/bet-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  bet: Bet;

  constructor(
    public dialog: MatDialog,
    private betService: BetService,
    private daysService: DayService,
    private goalService: GoalService,
    private seasonBetService: SeasonBetService
  ) {}

  openSingleDialog(): void {
    this.dialog
      .open(BetDialogComponent, {
        width: '800px'
      })
      .afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed', result, !!result);
        if (!!result) {
          this.bet = result;
          this.bet.valueReturn = 0;
          this.bet.id = '' + Date.now();
          this.betService.addBet(this.bet);
        }
        console.log(this.bet);
      });
  }

  openDayDialog() {
    this.dialog
      .open(NewDayDialogComponent, {
        disableClose: true,
        data: {}
      })
      .afterClosed()
      .subscribe(result => {
        console.log('dialog closed');
        // this.goalService.addGoal(result);
      });
    // create component for bets
    // call with init data
    // on close, call
    // this.betService.addBets(bets);
  }

  openGoalDialog(): void {
    this.dialog
      .open(NewGoalDialogComponent, {
        data: {}
      })
      .afterClosed()
      .subscribe(result => {
        console.log('dialog closed');
        this.goalService.addGoal(result);
      });
  }

  openSeasonBetDialog(): void {
    this.dialog
      .open(NewSeasonBetDialogComponent)
      .afterClosed()
      .subscribe(result => {
        console.log('dialog closed');
        this.seasonBetService.addBet(result);
      });
  }
}
