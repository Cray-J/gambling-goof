import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Bet} from '../../shared/model/bet.model';
import {Bookie} from '../../shared/model/bookie.enum';
import { BetType } from '../../shared/model/bet-type.enum';

@Component({
  selector: 'app-new-bet-dialog',
  templateUrl: './new-bet-dialog.component.html',
  styleUrls: ['./new-bet-dialog.component.css']
})
export class NewBetDialogComponent {

  bet: Bet;
  public bookies = Bookie.allBookies();
  public betTypes = BetType.allTypes();
  public confidence_levels = [1, 2, 3, 4, 5];

  constructor(
    public dialogRef: MatDialogRef<NewBetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
