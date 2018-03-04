export interface Bet {
  id: string;
  match: string;
  selection: string;
  stake: number;
  odds: number;
  // outcome: Outcome;
  date: Date;
}
