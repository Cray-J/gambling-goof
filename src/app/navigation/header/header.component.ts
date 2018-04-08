import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewBetDialogComponent} from '../../bets/new-bet-dialog/new-bet-dialog.component';
import { SingleBet } from '../../bets/singlebet.model';
import {BetService} from "../../bets/bet.service";
import {BetType} from "../../bets/bet-type.enum";

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
        console.log(result);
        console.log(this.bet);

        this.betService.addBet(this.bet);

      }

    });
  }

  onToggleSidenav() {

  }


  ngOnInit() {
  }

  recalculate() {
    console.log('recalculating');
  }

}
