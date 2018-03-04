import { Bet } from './bet.model';
import { Subject } from 'rxjs/Subject';

export class BetService {
  private dailyBets: Bet[] = [];
  dailyBetsChanged = new Subject<Bet[]>();

  public addBet(bet: Bet) {
    this.dailyBets.push(bet);
    this.dailyBetsChanged.next(this.dailyBets);
  }

  public getBets(): Bet[] {
    return this.dailyBets.slice();
  }
}
