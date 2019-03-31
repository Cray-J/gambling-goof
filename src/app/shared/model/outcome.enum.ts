export enum Outcome {
  awaiting = 'awaiting',
  win = 'win',
  halfWin = 'halfWin',
  void = 'void',
  push = 'push',
  halfLoss = 'halfLoss',
  loss = 'loss'
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

export function getValue() {
  return Outcome.awaiting;
}
