import { Component, OnInit } from '@angular/core';
import { DayService } from '../../core/day.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Day } from '../../shared/model/day.model';
import { Bookie } from '../../shared/model/bookie.enum';
import { Outcome } from '../../shared/model/outcome.enum';
import { BetType } from '../../shared/model/bet-type.enum';
import { ToText } from '../../shared/model/to-text';
import { Bet } from '../../shared/model/bet.model';
import { $enum } from 'ts-enum-util';

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
export class DayTableComponent implements OnInit {
  public displayedColumns = ['date', 'bets', 'result'];
  public subRows = ['time', 'match', 'selection', 'stake', 'odds', 'return'];
  expandedElement: Day | null;
  public days: Day[];
  public toText = ToText;
  public outcomes = $enum(Outcome).getKeys();

  constructor(private dayService: DayService) {}

  public ngOnInit(): void {
    console.log('oninit');
    this.dayService.daysChanged.subscribe(result => {
      console.log('got days: ', result);
      this.days = result;
    });
  }

  public numberOfBets(day: Day) {
    let bets = 0;
    day.matches.map(m => (bets += m.bets.length));
    return bets;
  }

  updateValue(day: Day, bet: Bet, outcome: Outcome) {
    console.log(day, bet, outcome);
    bet.outcome = outcome;
    bet.valueReturn = $enum.mapValue(outcome).with({
      [Outcome.win]: bet.stake * bet.odds - bet.stake,
      [Outcome.halfWin]: (bet.stake * bet.odds - bet.stake) / 2,
      [Outcome.push]: 0,
      [Outcome._void]: 0,
      [Outcome.awaiting]: null,
      [Outcome.halfLoss]: -bet.stake / 2,
      [Outcome.loss]: -bet.stake
    });
    console.log('updating', bet);
    day.matches.forEach(m => {
      m.bets.forEach(b => {
        if (b.valueReturn) {
          day.result += b.valueReturn;
        }
      });
    });
    console.log(day.result);
    this.dayService.update(day);
  }
}
