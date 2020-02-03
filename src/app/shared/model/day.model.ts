import { Bet } from './bet.model';

export class Day {
  constructor(public id: string, public date: Date, public bets: Bet[], result = 0) {
  }
}
