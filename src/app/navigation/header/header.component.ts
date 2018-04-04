import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewBetDialogComponent} from '../../bets/new-bet-dialog/new-bet-dialog.component';
import { SingleBet } from '../../bets/singlebet.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  animal: string;
  name: string;

  bet: SingleBet;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewBetDialogComponent, {
      data: {name: this.name, animal: this.animal, bet: this.bet}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.bet = result;
      console.log(result);
      console.log(this.animal);
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
