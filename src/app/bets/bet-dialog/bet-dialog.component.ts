import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Day } from '../../shared/model/day.model';
import { Match } from '../../shared/model/match.model';
import { Bet } from '../../shared/model/bet.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { leagues, LeaguesGroup } from '../../shared/leagues';
import { Bookie } from '../../shared/model/bookie.enum';
import { $enum } from 'ts-enum-util';
//import * as teams from '../../shared/teams';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-bet-dialog',
  templateUrl: './bet-dialog.component.html',
  styleUrls: ['./bet-dialog.component.scss']
})
export class BetDialogComponent implements OnInit {
  public day: Day;
  public match: Match;
  public bet: Bet;
  public leagueGroups = leagues;
  public bookies = $enum(Bookie).getKeys();
  public filteredBookies: Observable<string[]>;

  betForm: FormGroup = this._formBuilder.group({
    date: new FormControl(),
    home: new FormControl(),
    away: new FormControl(),
    leagueGroup: new FormControl(),
    bookiesGroup: new FormControl(),
    selection: new FormControl(),
    stake: new FormControl(100),
    odds: new FormControl()
  });

  leagueGroupOptions: Observable<LeaguesGroup[]>;

  constructor(public dialogRef: MatDialogRef<BetDialogComponent>,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.leagueGroupOptions = this.betForm.get('leagueGroup').valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );

    this.filteredBookies = this.betForm.controls['bookiesGroup'].valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterBookies(value))
      );
  }

  onSubmit() {
    const formVal = this.betForm.getRawValue();
    const day: Day = new Day(
      {
        date: formVal.date,
        result: 0,
        matches: [
          {
            date: formVal.date,
            home: formVal.home,
            away: formVal.away,
            league: formVal.leagueGroup,
            bets: [{
              bookie: formVal.bookiesGroup,
              selection: formVal.selection,
              stake: formVal.stake,
              odds: formVal.odds
            }],
          }
        ]}
    );
    this.dialogRef.close(day);
  }

  onCancel() {
    this.dialogRef.close();
  }

  private _filterGroup(value: string): LeaguesGroup[] {
    if (value) {
      return this.leagueGroups
        .map(group => ({country: group.country, leagues: _filter(group.leagues, value)}))
        .filter(group => group.leagues.length > 0)
    }
    return this.leagueGroups;
  }

  private filterBookies(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.bookies.filter(bookie => bookie.toLowerCase().includes(filterValue));
  }
}
