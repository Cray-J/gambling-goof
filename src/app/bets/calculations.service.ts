import { Outcome } from './outcome.enum';
import {NgForm} from '@angular/forms';
import { MultiBet } from './bet.model';
import { SingleBet } from './singlebet.model';
import {BankService} from "../bank.service";
import {Injectable} from "@angular/core";

@Injectable()
export class CalculationsService {

  constructor(private bankService: BankService) {}

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
    let valueReturn = 0;
    const bet = form.value;
    const stake = bet.stake;
    const odds = bet.odds;

    if (Outcome[bet.outcome] === Outcome.loss) {
      valueReturn = -stake;
    } else if (Outcome[bet.outcome] === Outcome.win) {
      valueReturn = stake * odds - stake;
    } else if (Outcome[bet.outcome] === Outcome.halfWin) {
      const realOdds = ((bet.odds - 1) / 2) + 1;
      valueReturn = stake * realOdds - stake;
    } else if (Outcome[bet.outcome] === Outcome.halfLoss) {
      valueReturn = -stake / 2;
    }
    return valueReturn;

  }

  public determineReturnsForSingle(bet: SingleBet) {
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

  public determineReturnsForMulti(bet: MultiBet) {
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
