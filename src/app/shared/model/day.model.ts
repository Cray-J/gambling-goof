import { Bet } from './bet.model';

export class Day {
  id: string;
  date: Date;
  bets: Bet[];
  summary: string;
  result: number;
  verfied: boolean;
}
