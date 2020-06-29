import { Bookie } from './bookie.enum';
import { Outcome } from './outcome.enum';
import { BetType } from './bet-type.enum';

export class Bet {
  id: string;
  selection: string;
  stake: number;
  odds: number;
  bookie: Bookie;
  outcome: Outcome;
  valueReturn: number;
  betType: BetType;
  league: string;

  constructor(json) {
    this.id = json.id;
    this.selection = json.selection;
    this.stake = json.stake;
    this.odds = json.odds;
    this.bookie = json.bookie;
    this.outcome = json.outcome;
    this.valueReturn = json.valueReturn;
    this.betType = json.betType;
    this.league = json.league;
  }
}
