import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bet } from '../../shared/model/bet.model';
import { Bookie } from '../../shared/model/bookie.enum';
import { BetType } from '../../shared/model/bet-type.enum';
import { $enum } from 'ts-enum-util';
import { Match } from '../../shared/model/match.model';
import { Day } from '../../shared/model/day.model';

@Component({
  selector: 'new-bet-dialog',
  templateUrl: './new-bet-dialog.component.html',
  styleUrls: ['./new-bet-dialog.component.scss']
})
export class NewBetDialogComponent {
  bet: Bet;
  public bookies = $enum(Bookie).getKeys();
  public betTypes = $enum(BetType).getKeys();

  constructor(
    public dialogRef: MatDialogRef<NewBetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [Day, Match, Bet]
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close();
  }
}
