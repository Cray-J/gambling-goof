import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewBetDialogComponent } from '../bets/new-bet-dialog/new-bet-dialog.component';
import { Bet } from '../shared/model/bet.model';
import { BetService } from '../core/bet.service';
import { BetType } from '../shared/model/bet-type.enum';
import { NewGoalDialogComponent } from '../bets/new-goal-dialog/new-goal-dialog.component';
import { GoalService } from "../core/goal.service";
import { NewDayDialogComponent } from "../bets/new-day-dialog/new-day-dialog.component";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  bet: Bet;

  constructor(public dialog: MatDialog,
              private betService: BetService,
              private goalService: GoalService) {
  }

  openSingleDialog(): void {
    const dialogRef = this.dialog.open(NewBetDialogComponent, {
      data: {
        bet:
          {
            date: new Date(),
            stake: 100,
            confidence: 3,
            betType: BetType.single
          },
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== null) {
        this.bet = result;
        this.bet.valueReturn = 0;
        this.bet.id = '' + Date.now();
        this.betService.addBet(this.bet);
      }
      console.log(this.bet);
    });
  }

  openDayDialog() {
    const dialogRef = this.dialog.open(NewDayDialogComponent, {
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
      // this.goalService.addGoal(result);
    });
    // create component for bets
    // call with init data
    // on close, call
    // this.betService.addBets(bets);
  }

  openGoalDialog(): void {
    const dialogRef = this.dialog.open(NewGoalDialogComponent, {
        data: {

        }
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log('dialog closed');
      this.goalService.addGoal(result);
    });
  }
}
