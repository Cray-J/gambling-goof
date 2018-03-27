import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Bank } from './bets/bank.model';
import { Bookie } from './bets/bookie.enum';

@Injectable()
export class BankService {

  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  getBookies(): Bank {
    const bank: Bank = {
      bookies: [
        {
          initialBankroll: 2800,
          currentBankroll: 2800,
          wins: 10,
          losses: 10,
          bookie: Bookie.bet365
        },
        {
          initialBankroll: 2000,
          currentBankroll: 2000,
          wins: 5,
          losses: 3,
          bookie: Bookie.unibet
        },
        {
          initialBankroll: 2000,
          currentBankroll: 1900,
          wins: 4,
          losses: 5,
          bookie: Bookie.coolbet
        }
      ],
      initialBankroll: 10000,
      currentBankroll: 10000
    };

    return bank;
  }

  // public fetchDailyWebBets(): void {
  //   this.fbSubs.push(this.db
  //     .collection('dailyWebSingle')
  //     .snapshotChanges()
  //     .map(docArray => {
  //       return docArray.map(doc => {
  //         const tempBet = doc.payload.doc.data() as Bet;
  //         tempBet.id = doc.payload.doc.id;
  //         return tempBet;
  //       });
  //     }).subscribe((bets: Bet[]) => {
  //       bets.sort(betDateComparator());
  //       this.dailyWebSingles = bets;
  //       this.dailyWebSinglesChanged.next([...this.dailyWebSingles]);
  //     }));
  // }
  //
}
