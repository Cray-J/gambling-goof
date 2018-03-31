import { Outcome } from './outcome.enum';
import { Bet } from './bet.model';
import {NgForm} from '@angular/forms';

export class CalculationsService {



  // determineReturns(bet: Bet) {
   /* switch (Outcome[bet.outcome]) {
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
    }*/
  // }

  getProjectedReturns(form: NgForm) {
    const outcome = form.value.outcome;
    const odds = form.value.odds;
    const stake = form.value.stake;
    if (outcome === 'win' ) {
      return odds * stake - stake;
    } else if (outcome === 'halfWin') {
      return (odds * stake - stake) / 2;
    } else if (outcome === 'halfLoss') {
      return -stake / 2;
    } else if (outcome === 'loss') {
      return -stake;
    }
    return 0;
  }


  public determineReturns(bet: Bet) {
    let odds = 1;

    for (const currBet of bet.bets) {
      if (Outcome[currBet.outcome] === Outcome.loss) {
        return -bet.stake;
      } else if (Outcome[currBet.outcome] === Outcome.win) {
        odds *= currBet.odds;
      } else if (Outcome[currBet.outcome] === Outcome.halfWin) {
        return currBet.odds / 2;
      } else if (Outcome[currBet.outcome] === Outcome.halfLoss) {
        return odds - currBet.odds / 2;
      }
    }

    return bet.stake * odds - bet.stake;
  }

}
