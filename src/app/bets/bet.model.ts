import {Bookie} from './bookie.enum';
import {BetType} from './bet-type.enum';
import {BetSelection} from './bet-selection.model';

export interface Bet {
  id: string;
  bets: BetSelection[];
  betType: BetType;
  valueReturn: number;
  bookie: Bookie;
  stake: number;
  odds: number;
  date: Date;

}
