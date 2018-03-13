import { Bet } from './bet.model';
import { Subject } from 'rxjs/Subject';
import {AngularFirestore} from 'angularfire2/firestore';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { BetType } from './bet-type.enum';
import {DoubleBet} from './doubleBet.model';

@Injectable()
export class BetService {
  private dailySingles: Bet[] = [];
  private dailyWebSingles: Bet[] = [];
  private eersteBets: Bet[] = [];
  dailySinglesChanged = new Subject<Bet[]>();
  dailyWebSinglesChanged = new Subject<Bet[]>();
  eersteBetsChanged = new Subject<Bet[]>();
  private fbSubs: Subscription[] = [];
  public currentTab = new Subject<string>();


  constructor(private db: AngularFirestore) {}

  public addBet(bet: Bet) {

    switch (BetType[bet.betType]) {
      case BetType.eersteDivisie:
        this.db.collection('eersteDivisieBets').add(bet);
        this.eersteBets.push(bet);
        this.eersteBetsChanged.next(this.eersteBets);
        break;
      case BetType.dailySingle:
        this.db.collection('dailySingle').add(bet);
        this.dailySingles.push(bet);
        this.dailySinglesChanged.next(this.dailySingles);
        break;
      case BetType.dailyWebSingle:
        this.db.collection('dailyWebSingle').add(bet);
        this.dailyWebSingles.push(bet);
        this.dailyWebSinglesChanged.next(this.dailyWebSingles);
        break;
    }
  }

  public addDouble(bet: DoubleBet) {
    this.db.collection(BetType.dailyDouble).add(bet);
  }

  public getDailyBets(): Bet[] {
    return this.dailySingles.slice();
  }

  public getDailyWebBets(): Bet[] {
    return this.dailyWebSingles.slice();
  }

  public fetchEersteBets(): Bet[] {
    this.fbSubs.push(this.db
      .collection('eersteDivisieBets')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            //id: doc.payload.doc.id,
            match: doc.payload.doc.data().match,
            selection: doc.payload.doc.data().selection,
            bookie: doc.payload.doc.data().bookie,
            stake: doc.payload.doc.data().stake,
            odds: doc.payload.doc.data().odds,
            date: doc.payload.doc.data().date,
            outcome: doc.payload.doc.data().outcome,
            valueReturn: doc.payload.doc.data().valueReturn
          };
        });
      }).subscribe((exercises: Bet[]) => {
        this.eersteBets = exercises;
        this.eersteBetsChanged.next([...this.eersteBets]);
      }));
    return this.eersteBets.slice();
  }


  public fetchDailyWebBets(): void {
    this.fbSubs.push(this.db
      .collection('dailyWebSingle')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            //id: doc.payload.doc.id,
            match: doc.payload.doc.data().match,
            selection: doc.payload.doc.data().selection,
            bookie: doc.payload.doc.data().bookie,
            stake: doc.payload.doc.data().stake,
            odds: doc.payload.doc.data().odds,
            date: doc.payload.doc.data().date,
            outcome: doc.payload.doc.data().outcome,
            valueReturn: doc.payload.doc.data().valueReturn
          };
        });
      }).subscribe((bets: Bet[]) => {
        this.dailyWebSingles = bets;
        this.dailyWebSinglesChanged.next([...this.dailyWebSingles]);
      }));
  }

  public fetchDailyBets(): void {
    this.fbSubs.push(this.db
      .collection('dailySingle')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            //id: doc.payload.doc.id,
            match: doc.payload.doc.data().match,
            selection: doc.payload.doc.data().selection,
            bookie: doc.payload.doc.data().bookie,
            stake: doc.payload.doc.data().stake,
            odds: doc.payload.doc.data().odds,
            date: doc.payload.doc.data().date,
            outcome: doc.payload.doc.data().outcome,
            valueReturn: doc.payload.doc.data().valueReturn,
            missedPen: doc.payload.doc.data().missedPen,
            redCard: doc.payload.doc.data().redCard
          };
        });
      }).subscribe((bets: Bet[]) => {
        this.dailySingles = bets;
        this.dailySinglesChanged.next([...this.dailySingles]);
      }));
  }
}
