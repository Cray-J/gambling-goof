import {Outcome} from './outcome.enum';

export interface MultiBetPart {
  id: string;
  redCard: boolean;
  missedPen: boolean;
  match: string;
  selection: string;
  odds: number;
  outcome: Outcome;

}
