import { Bank, Bookie } from './bookie.enum';

export class Account {
  name: Bookie | Bank;
  initialBalance: number;
  currentBalance: number;
}
