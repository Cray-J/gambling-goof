import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SeasonBet } from '../../shared/model/season-bet.model';
import { $enum } from 'ts-enum-util';
import { Bookie } from '../../shared/model/bookie.enum';

@Component({
  selector: 'app-new-season-bet-dialog',
  templateUrl: './new-season-bet-dialog.component.html',
  styleUrls: ['./new-season-bet-dialog.component.scss']
})
export class NewSeasonBetDialogComponent implements OnInit {

  public bet: SeasonBet;
  public bookies = $enum(Bookie).getKeys();

  constructor(public dialogRef: MatDialogRef<NewSeasonBetDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.bet = {
      bookie: undefined,
      odds: 0,
      settledDate: undefined,
      stake: 0,
      valueReturn: 0,
      id: '',
      selection: ''
    };
  }

}
