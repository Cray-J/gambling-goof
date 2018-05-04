export enum Outcome {
  awaiting,
  win,
  halfWin,
  void,
  push,
  halfLoss,
  loss
}


export function outComeToText(outcome: Outcome) {
  switch (outcome) {
    case Outcome.awaiting:
      return 'Awaiting';

    default:
      return '';
  }
}
