import { Bookie } from './bookie.enum';
import { $enum } from 'ts-enum-util';
import { Outcome } from './outcome.enum';

export namespace ToText {
  export function bookie(book: Bookie) {
    return $enum.mapValue(book).with({
      [Bookie.bet365]: 'Bet365',
      [Bookie.betfair]: 'Betfair',
      [Bookie.coolbet]: 'Coolbet',
      [Bookie.nordicBet]: 'Nordicbet',
      [Bookie.unibet]: 'Unibet',
      [Bookie.paddyPower]: 'PaddyPower',
      [Bookie.pinnacle]: 'Pinnacle'
    });
  }

  export function outcome(out: Outcome) {
    switch (out) {
      case Outcome.awaiting:
        return 'Awaiting';
      case Outcome.win:
        return 'Win';
      case Outcome.halfWin:
        return 'Half win';
      case Outcome._void:
        return 'Void';
      case Outcome.push:
        return 'Push';
      case Outcome.halfLoss:
        return 'Half loss';
      case Outcome.loss:
        return 'Loss';
    }
  }
}
