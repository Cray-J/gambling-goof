import { Outcome } from './outcome.enum';
import { Bet } from './bet.model';
import { DoubleBet } from "./doubleBet.model";

export class CalculationsService {



  determineReturns(bet: Bet) {
    switch (Outcome[bet.outcome]) {
      case Outcome.win:
        bet.valueReturn = bet.stake * bet.odds - bet.stake;
        break;
      case Outcome.halfWin:
        bet.valueReturn = (bet.stake * bet.odds - bet.stake) / 2;
        break;
      case Outcome.loss:
        bet.valueReturn = -bet.stake;
        break;
      case Outcome.halfLoss:
        bet.valueReturn = -bet.stake / 2;
        break;
      default:
        bet.valueReturn = 0;
    }
  }


  public determineReturnsFromDouble(bet: DoubleBet) {
    const bet1 = bet.bets[0];
    const bet2 = bet.bets[1];

    const outcome1 = bet1.outcome;
    const outcome2 = bet2.outcome;
    const odds1 = bet1.odds;
    const odds2 = bet2.odds;
    const stake = bet.stake;

    if (outcome1 === Outcome.loss || outcome2 === Outcome.loss) {
      return -stake;
    } else if (outcome1 === Outcome.win) {
      if (outcome2 === Outcome.win) {
        return stake * odds1 * odds2;
      } else if (outcome2 === Outcome.halfWin) {
        return stake * odds1 + (stake * odds2 / 2);
      } else if (outcome2 === Outcome.void || outcome2 === Outcome.push) {
        return stake * odds1;
      }
    } else if (outcome1 === Outcome.halfWin && outcome2 === Outcome.halfWin) {
      return stake * odds1 / 2 * odds2 / 2;
    } else if (outcome1 === Outcome.halfWin && outcome2 === Outcome.win) {
    }
    return 0;
  }

}
