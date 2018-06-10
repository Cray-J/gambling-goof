export enum Outcome {
  awaiting = 'Awaiting',
  win = 'Win',
  halfWin = 'Half-Win',
  void = 'Void',
  push = 'Push',
  halfLoss = 'Half-Loss',
  loss = 'Loss'
}

export function allOutcomes() {
  return [Outcome.awaiting,
  Outcome.win,
  Outcome.halfWin,
  Outcome.void,
  Outcome.push,
  Outcome.halfLoss,
  Outcome.loss];
}
