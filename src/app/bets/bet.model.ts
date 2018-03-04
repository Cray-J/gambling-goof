import {Outcome} from "./outcome.enum";

export interface Bet {
  id: string;
  match: string;
  selection: string;
  stake: number;
  odds: number;
  outcome: string;
  // outcome: Outcome;
  date: Date;
  valueReturn: number;
}
