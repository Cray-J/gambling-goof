import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewBetDialogComponent } from '../../bets/new-bet-dialog/new-bet-dialog.component';
import { SingleBet } from '../../bets/singlebet.model';
import { BetService } from '../../bets/bet.service';
import { BetType } from '../../bets/bet-type.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  bet: SingleBet;

  constructor(public dialog: MatDialog,
              private betService: BetService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewBetDialogComponent, {
      data: {
        bet:
          {
            date: new Date(),
            betType: BetType[BetType.unitBet]
          }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== null) {
        this.bet = result;
        this.bet.id = this.buildId();
        this.betService.addBet(this.bet);
      }
    });
  }

  buildId() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm; // January is 0!
    let dd;
    let hours;
    let minutes;
    let seconds;
    today.getTime();

    mm = this.checkFormat(this.bet.date.getMonth() + 1);
    dd = this.checkFormat(this.bet.date.getDate());
    hours = this.checkFormat(today.getHours());
    minutes = this.checkFormat(today.getMinutes());
    seconds = this.checkFormat(today.getSeconds());

    return '' + yyyy + mm + dd + hours + minutes + seconds;
  }

  checkFormat(time: number): string {
    if (time < 10) {
      return '0' + time;
    }
    return '' + time;
  }

  onToggleSidenav() {

  }


  ngOnInit() {
  }

  recalculate() {
    console.log('recalculating');
  }

}
