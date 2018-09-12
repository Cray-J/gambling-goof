import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Bet} from '../bet.model';
import {BetType} from '../bet-type.enum';
import {Bookie} from '../bookie.enum';
import {Outcome} from '../outcome.enum';

@Component({
  selector: 'app-new-bet-dialog',
  templateUrl: './new-bet-dialog.component.html',
  styleUrls: ['./new-bet-dialog.component.css']
})
export class NewBetDialogComponent implements OnInit {

  bet: Bet;
  public betTypes = BetType;
  public bookies = Bookie;
  public outcomes = Outcome;



  constructor(
    public dialogRef: MatDialogRef<NewBetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
