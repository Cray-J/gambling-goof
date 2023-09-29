import { Outcome } from "./outcome.enum";
import { Bookie } from "./bookie.enum";

export interface PartBet {
  match: string;
  selection: string;
  league?: string;
  odds: number;
  outcome: Outcome;
  redCard?: boolean;
  missedPenalty?: boolean;
}

export interface BetSlip {
  id?: string;
  date: string;
  stake: number;
  bookie: Bookie;
  odds: number;
  outcome: Outcome;
  balanceChange: number;
  locked?: boolean;
  selections: PartBet[];
}
