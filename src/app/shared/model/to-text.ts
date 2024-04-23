import { Outcome } from './outcome.enum';

export namespace ToText {
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
