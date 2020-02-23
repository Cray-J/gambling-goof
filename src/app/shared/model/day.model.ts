import { Match } from './match.model';

export class Day {
  id: string;
  date: Date;
  matches: Match[];
  summary: string;
  result: number;
  verified: boolean;
}
