import {Outcome} from './outcome.enum';

export interface BetSelection {
  id: string;
  redCard: boolean;
  missedPen: boolean;
  match: string;
  selection: string;
  odds: number;
  outcome: Outcome;
  finalScore: string;
}
