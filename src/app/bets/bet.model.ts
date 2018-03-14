import {Outcome} from './outcome.enum';
import {Bookie} from './bookie.enum';
import { BetType } from './bet-type.enum';

export interface Bet {
  id: string;
  match: string;
  selection: string;
  stake: number;
  odds: number;
  outcome: Outcome;
  betType: BetType;
  bookie: Bookie;
  date: Date;
  valueReturn: number;
  redCard: boolean;
  missedPen: boolean;
}
