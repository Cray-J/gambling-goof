import { Component, OnDestroy, OnInit } from '@angular/core';
import { DayService } from '../../core/day.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Bet } from '../../shared/model/bet.model';

interface MatchRow {
  match: string,
  bets: Bet[];
}

interface DayRow {
  time: Date,
  result: number,
  verified: boolean,
  bets: MatchRow[],
  outcome: number,
  totalBets,
  matchesInformation: string
}


@Component({
  selector: 'day-table',
  templateUrl: './day-table.component.html',
  styleUrls: ['./day-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class DayTableComponent implements OnInit, OnDestroy {
  public subs;
  public dayRows: DayRow[] = [];

  constructor(private dayService: DayService) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public ngOnInit(): void {
    this.subs = this.dayService.daysChanged.subscribe(result => {
      this.dayRows = [];
      console.log('got days: ', result);
      result.forEach(day => {
        let bets = 0;
        let outcome = 0;
        day.matches.forEach(m => {
          bets += m.bets.length;
          outcome += m.bets.filter(b => b.valueReturn > 0).length;
        });
        let matchString = '';
        day.matches.map((m, i) => matchString += `${m.home} v ${m.away}${i === day.matches.length -1 ? ' ' : ', '} `);

        let matchRows: MatchRow[] = [];
        day.matches.forEach(m => {
           matchRows.push({
             match: `${m.home} v ${m.away}`,
             bets: m.bets
           })
        });

        this.dayRows.push({
          bets: matchRows,
          result: day.result,
          time: day.date,
          verified: day.verified,
          totalBets: bets,
          outcome: outcome,
          matchesInformation: matchString
        });
      });
    });
  }
}
