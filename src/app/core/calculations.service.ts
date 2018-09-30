import { Outcome } from '../shared/model/outcome.enum';
import { Bet } from '../shared/model/bet.model';
import {Injectable} from '@angular/core';

@Injectable()
export class CalculationsService {

  constructor() {}

  public determineReturnsForSingle(bet: Bet) {
    bet.valueReturn = 0;
    const stake = bet.stake;
    const odds = bet.odds;

      if (Outcome[bet.outcome] === Outcome.loss) {
        bet.valueReturn = -stake;
      } else if (Outcome[bet.outcome] === Outcome.win) {
        bet.valueReturn = stake * odds - stake;
      } else if (Outcome[bet.outcome] === Outcome.halfWin) {
        console.log(((bet.odds - 1) / 2) + 1);
        const realOdds = ((bet.odds - 1) / 2) + 1;
        bet.valueReturn = stake * realOdds - stake;
      } else if (Outcome[bet.outcome] === Outcome.halfLoss) {
        bet.valueReturn = -stake / 2;
      }
  }

}
