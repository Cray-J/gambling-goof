import {Outcome} from './outcome.enum';
import {Bookie} from './bookie.enum';

export interface Bet {
  id: string;
  match: string;
  selection: string;
  stake: number;
  odds: number;
  outcome: Outcome;
  betType: string;
  bookie: Bookie;
  date: Date;
  valueReturn: number;
  redCard: boolean;
  missedPen: boolean;
}
