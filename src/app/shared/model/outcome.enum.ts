export enum Outcome {
  awaiting = 'awaiting',
  win = 'win',
  halfWin = 'halfWin',
  _void = '_void',
  push = 'push',
  halfLoss = 'halfLoss',
  loss = 'loss'
}

export namespace Outcome {
  export function toText(outcome: Outcome) {
    switch (outcome) {
      case Outcome.awaiting: return 'Awaiting';
      case Outcome.win: return 'Win';
      case Outcome.halfWin: return 'Half win';
      case Outcome._void: return 'Void';
      case Outcome.push: return 'Push';
      case Outcome.halfLoss: return 'Half loss';
      case Outcome.loss: return 'Loss';
    }
  }
}

export function allOutcomes() {
  return [Outcome.awaiting,
  Outcome.win,
  Outcome.halfWin,
  Outcome._void,
  Outcome.push,
  Outcome.halfLoss,
  Outcome.loss];
}
