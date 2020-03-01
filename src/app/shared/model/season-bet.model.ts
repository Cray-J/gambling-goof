import { Bookie } from './bookie.enum';

export interface SeasonBet {
  id: string;
  selection: string;
  stake: number;
  odds: number;
  bookie: Bookie;
  valueReturn: number;
  settledDate: Date;
}
