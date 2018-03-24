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
    let odds = 1;

    for (const currBet of bet.bets) {
      console.log(currBet.outcome);
      if (Outcome[currBet.outcome] === Outcome.loss) {
        return -bet.stake;
      } else if (Outcome[currBet.outcome] === Outcome.win) {
        console.log("matched on win");
        odds *= currBet.odds;
      } else if (Outcome[currBet.outcome] === Outcome.halfWin) {
        return currBet.odds / 2;
      } else if (Outcome[currBet.outcome] === Outcome.halfLoss) {
        return odds - currBet.odds / 2;
      }
    }

    return bet.stake * odds;
  }

}
