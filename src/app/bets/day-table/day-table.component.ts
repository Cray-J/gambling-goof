import { Component } from '@angular/core';
import { DayService } from '../../core/day.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Day } from '../../shared/model/day.model';
import { Bookie } from '../../shared/model/bookie.enum';
import { Outcome } from '../../shared/model/outcome.enum';
import { BetType } from '../../shared/model/bet-type.enum';

@Component({
  selector: 'day-table',
  templateUrl: './day-table.component.html',
  styleUrls: ['./day-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-berzier(0.4, 0.0, 0.2, 1'))
    ])
  ]
})
export class DayTableComponent {
  public displayedColumns = ['date', 'bets', 'result'];
  public subRows = ['time', 'match', 'selection', 'stake', 'odds', 'return'];
  dataSource = ELEMENT_DATA;
  expandedElement: Day | null;

  constructor(private dayService: DayService) {
  }
}

const ELEMENT_DATA: Day[] = [
  new Day('id1', new Date(2020, 2, 4), [
    {
      id: '10',
      date: new Date(2020, 2, 4, 14, 30),
      match: 'Sevilla v Barcelona',
      selection: '',
      stake: 100,
      odds: 1.80,
      bookie: Bookie.bet365,
      outcome: Outcome.win,
      valueReturn: 80,
      botd: false,
      betType: BetType.single
    },
    {
      id: '11',
      date: new Date(2020, 2, 4, 18, 30),
      match: 'Real Madrid v Real Sociedad',
      selection: 'BTTS',
      stake: 100,
      odds: 1.90,
      bookie: Bookie.unibet,
      outcome: Outcome.win,
      valueReturn: 90,
      botd: false,
      betType: BetType.single
    }
  ], 170),
  new Day('id2', new Date(2020, 2, 5), [
    {
      id: '13',
      date: new Date(2020, 2, 5, 18, 30),
      match: 'Leicester v Newcastle',
      selection: 'BTTS',
      stake: 100,
      odds: 1.90,
      bookie: Bookie.unibet,
      outcome: Outcome.loss,
      valueReturn: -100,
      botd: false,
      betType: BetType.single
    }
  ], -100
  )
];
