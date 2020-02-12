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
  botd: boolean;
  betType: BetType;
}
