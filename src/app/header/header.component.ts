import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bet } from '../shared/model/bet.model';
import { NewGoalDialogComponent } from '../bets/new-goal-dialog/new-goal-dialog.component';
import { GoalService } from '../core/goal.service';
import { NewDayDialogComponent } from '../bets/new-day-dialog/new-day-dialog.component';
import { DayService } from '../core/day.service';
import { SeasonBetService } from '../core/season-bet.service';
import { NewSeasonBetDialogComponent } from '../bets/new-season-bet-dialog/new-season-bet-dialog.component';
import { BetDialogComponent } from '../bets/bet-dialog/bet-dialog.component';
import { Day } from '../shared/model/day.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  bet: Bet;

  constructor(
    public dialog: MatDialog,
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
      .subscribe((result: Day) => {
        console.log('The dialog was closed', result, !!result);
        if (!!result) {
          this.daysService.save(result);
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
        console.log('dialog closed', result);
        this.seasonBetService.addBet(result);
      });
  }
}
