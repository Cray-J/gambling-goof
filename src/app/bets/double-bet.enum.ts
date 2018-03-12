import { Bet } from './bet.model';
import { Outcome } from './outcome.enum';
import { Bookie } from './bookie.enum';

export class DoubleBet {
  date: Date;
  bets: Bet[];
  stake: number;
  outcome: Outcome;
  bookie: Bookie;
  valueReturn: number;

  constructor(date: Date, stake: number, bookie: Bookie) {
    this.bets = [];
    this.date = date;
    this.stake = stake;
    this.bookie = bookie;
  }
}
