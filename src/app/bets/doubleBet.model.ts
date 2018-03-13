import {Bookie} from './bookie.enum';
import {MultiBetPart} from './multi-bet-part.model';

export interface DoubleBet {
  bets: MultiBetPart[];
  valueReturn: number;
  bookie: Bookie;
  stake: number;
  odds: number;
  date: Date;

}
