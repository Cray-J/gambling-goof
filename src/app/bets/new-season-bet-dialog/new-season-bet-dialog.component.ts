import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SeasonBet } from '../../shared/model/season-bet.model';
import { $enum } from 'ts-enum-util';
import { Bookie } from '../../shared/model/bookie.enum';
import { SeasonBetType } from '../../shared/model/season-bet-type.enum';
import { leagues } from '../../shared/leagues';
import { count } from 'rxjs/operators';
import { Outcome } from '../../shared/model/outcome.enum';

@Component({
  selector: 'app-new-season-bet-dialog',
  templateUrl: './new-season-bet-dialog.component.html',
  styleUrls: ['./new-season-bet-dialog.component.scss']
})
export class NewSeasonBetDialogComponent implements OnInit {
  public bet: SeasonBet;
  public bookies = $enum(Bookie).getKeys();
  public subtypes = $enum(SeasonBetType).getKeys();
  public league = [];

  constructor(public dialogRef: MatDialogRef<NewSeasonBetDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    leagues.forEach(country => this.league.push(...country.leagues));
    this.bet = new SeasonBet({
      bookie: undefined,
      odds: 0,
      settledDate: undefined,
      placedDate: undefined,
      outcome: Outcome.awaiting,
      stake: 0,
      valueReturn: 0,
      id: '',
      league: '',
      selection: '',
      subtype: ''
    });
  }
}
