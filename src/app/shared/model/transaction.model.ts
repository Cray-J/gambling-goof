import { Bank, Bookie } from './bookie.enum';

export class Transaction {
  from: Bookie | Bank;
  to: Bookie | Bank;
  amount: number;
  date: Date;
}
