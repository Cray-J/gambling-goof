import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {Bank, BookieAccount} from './bets/bank.model';
import { Bookie } from './bets/bookie.enum';

@Injectable()
export class BankService {
  private bank: Bank;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {
    this.bank = {
      bookies: [
        {
          initialBankroll: 3000,
          currentBankroll: 3000,
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

  public getBet365(): number {
    let val = 0;
     this.bank.bookies.forEach((bookie: BookieAccount) => {
      if (bookie.bookie === Bookie.bet365) {
        console.log(bookie.currentBankroll);
        val = bookie.currentBankroll;
     }
    });
     return val;
  }
