import { Bookie } from './bookie.enum';
import { Outcome } from './outcome.enum';

export class Bet {
  id: string;
  selection: string;
  stake: number;
  odds: number;
  bookie: Bookie;
  outcome: Outcome;
  valueReturn: number;
  verifiedResult: boolean;

  constructor(json) {
    this.id = json.id || '';
    this.selection = json.selection;
    this.stake = json.stake;
    this.odds = json.odds;
    this.bookie = json.bookie;
    this.outcome = json.outcome || Outcome.awaiting;
    this.valueReturn = json.valueReturn || 0;
    // this.betType = json.betType || null;
    this.verifiedResult = json.verifiedResult || false;
  }
}
