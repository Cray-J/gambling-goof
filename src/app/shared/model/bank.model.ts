import { Bookie } from './bookie.enum';

export interface BookieAccount {
  initialBankroll: number;
  currentBankroll: number;
  wins: number;
  losses: number;
  bookie: Bookie;
}

export interface Bank {
  bookies: BookieAccount[];
  initialBankroll: number;
  currentBankroll: number;
}

