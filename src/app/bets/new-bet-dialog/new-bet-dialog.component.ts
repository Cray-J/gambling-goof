import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Bet} from '../../shared/model/bet.model';
import {Bookie} from '../../shared/model/bookie.enum';

@Component({
  selector: 'app-new-bet-dialog',
  templateUrl: './new-bet-dialog.component.html',
  styleUrls: ['./new-bet-dialog.component.css']
})
export class NewBetDialogComponent implements OnInit {

  bet: Bet;
  public bookies = Bookie;

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
