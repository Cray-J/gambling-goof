import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Bank } from './bets/bank.model';
import { Bookie } from './bets/bookie.enum';

@Injectable()
export class BankService {
  private bank: Bank;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {
    this.bank = {
      bookies: [
        {
          initialBankroll: 2800,
          currentBankroll: 2800,
          wins: 0,
          losses: 0,
          bookie: Bookie.bet365
        },
        {
          initialBankroll: 2000,
          currentBankroll: 2000,
          wins: 0,
          losses: 0,
          bookie: Bookie.unibet
        },
        {
          initialBankroll: 2000,
          currentBankroll: 2000,
          wins: 0,
          losses: 0,
          bookie: Bookie.coolbet
        }
      ],
      initialBankroll: 10000,
      currentBankroll: 10000
    };
  }

  getBookies(): Bank {
    return this.bank;
  }
}
