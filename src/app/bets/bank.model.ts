import { Bookie } from './bookie.enum';

export interface Bank {
  bookies: Bookie[];
  initialBankroll: number;
  currentBankroll: number;
}
