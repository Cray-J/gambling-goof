import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewBetDialogComponent } from '../../bets/new-bet-dialog/new-bet-dialog.component';
import { Bet } from '../../shared/model/bet.model';
import { BetService } from '../../core/bet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  bet: Bet;

  constructor(public dialog: MatDialog,
              private betService: BetService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewBetDialogComponent, {
      data: {
        bet:
          {
            date: new Date()
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

  onToggleSidenav() {

  }

}
