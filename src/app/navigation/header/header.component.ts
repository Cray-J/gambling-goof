import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewBetDialogComponent} from '../../bets/new-bet-dialog/new-bet-dialog.component';
import { SingleBet } from '../../bets/singlebet.model';
import {BetService} from "../../bets/bet.service";
import {BetType} from "../../bets/bet-type.enum";
import {NewBetComponent} from "../../bets/new-bet/new-bet.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  bet: SingleBet;

  constructor(public dialog: MatDialog,
              private betService: BetService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewBetDialogComponent, {
      data: { bet: {}}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== null) {
        this.bet = result;
        this.bet.id = this.buildId();
        console.log(result);
        console.log(this.bet);

        this.betService.addBet(this.bet);
    });
  }

  buildId() {
    const today = new Date();
    let dd;
    let mm; // January is 0!
    const yyyy = today.getFullYear();
    today.getTime();

    if (today.getDate() < 10) {
      dd = '0' + today.getDate();
    } else {
      dd = today.getDate();
    }


    if ( today.getMonth() + 1 < 10) {
      mm = '0' + (today.getMonth() + 1);
    } else {
      mm = today.getMonth() + 1;
    }

    return '' + yyyy + mm  + dd + today.getHours() + today.getMinutes() + today.getSeconds();
  }

  onToggleSidenav() {

  }


  ngOnInit() {
  }

  recalculate() {
    console.log('recalculating');
  }

}
