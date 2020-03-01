import { Bet } from './bet.model';

export class Match {
  id: string;
  home: string;
  away: string;
  match: string;
  date: Date;
  valueReturn: number;
  bets: Bet[];
}
