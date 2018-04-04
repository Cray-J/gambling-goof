import { BetType } from './bet-type.enum';
import { Bookie } from './bookie.enum';
import { Outcome } from './outcome.enum';

export interface SingleBet {
  id: string;
  date: Date;
  match: string;
  selection: string;
  stake: number;
  odds: number;
  betType: BetType;
  bookie: Bookie;
  outcome: Outcome;
  valueReturn: number;
  redCard: boolean;
  missedPen: boolean;
  finalScore: string;
  reasoning: string;
  review: string;
}
