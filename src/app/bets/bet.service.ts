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
  private minorPlays: Bet[] = [];
  public currentSelectedBetType: string;
  dailySinglesChanged = new Subject<Bet[]>();
  dailyWebSinglesChanged = new Subject<Bet[]>();
  minorPlaysChanged = new Subject<Bet[]>();
  private fbSubs: Subscription[] = [];
  public currentTab = new Subject<string>();
  private doubleBets: DoubleBet[] = [];
  dailyDoublesChanged = new Subject<DoubleBet[]>();


  constructor(private db: AngularFirestore) {}

  public addBet(bet: Bet) {

    switch (BetType[bet.betType]) {
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
      case BetType.minorPlay:
        this.db.collection(bet.betType).add(bet);
        this.minorPlays.push(bet);
        this.minorPlaysChanged.next(this.minorPlays);
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

  public getDailyDoubles(): DoubleBet[] {
    return this.doubleBets.slice();
  }

  private mapToBet(doc) {
    return {
      // id: doc.payload.doc.id,
      match: doc.payload.doc.data().match,
      selection: doc.payload.doc.data().selection,
      bookie: doc.payload.doc.data().bookie,
      stake: doc.payload.doc.data().stake,
      odds: doc.payload.doc.data().odds,
      date: doc.payload.doc.data().date,
      outcome: doc.payload.doc.data().outcome,
      valueReturn: doc.payload.doc.data().valueReturn,
      redCard: doc.payload.doc.data().redCard
    };
  }

  private mapToDouble(doc) {
    console.log(doc.payload.doc.data());
    return {
      bets: doc.payload.doc.data().bets,
      date: doc.payload.doc.data().date,
      bookie: doc.payload.doc.data().bookie,
      stake: doc.payload.doc.data().stake,
      odds: doc.payload.doc.data().odds,
      valueReturn: doc.payload.doc.data().valueReturn
    };
  }

  public fetchDailyWebBets(): void {
    this.fbSubs.push(this.db
      .collection('dailyWebSingle')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return this.mapToBet(doc);
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
            // id: doc.payload.doc.id,
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

  public fetchMinorPlays(): Bet[] {
    this.fbSubs.push(this.db
      .collection('minorPlay')
      .snapshotChanges()
      .map(docArray => {
        console.log('Fetching from ' + BetType.minorPlay);
        return docArray.map(doc => {
          return this.mapToBet(doc);
        });
      }).subscribe((bets: Bet[]) => {
        this.minorPlays = bets;
        this.minorPlaysChanged.next([...this.minorPlays]);
      }));
    return this.minorPlays.slice();
  }


  public fetchDoubles(): DoubleBet[] {
    this.fbSubs.push(this.db
      .collection(BetType.dailyDouble)
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return this.mapToDouble(doc);
        });
      }).subscribe((bets: DoubleBet[]) => {
        this.doubleBets = bets;
        this.dailyDoublesChanged.next([...this.doubleBets]);
      }));
    return this.doubleBets.slice();

    // console.log('fetching : ' + BetType.dailyDouble);
    // this.fbSubs.push(this.db
    //   .collection(BetType.dailyDouble)
    //   .snapshotChanges()
    //   .map(docArray => {
    //     console.log('mapping ' + docArray);
    //     return docArray.map(doc => {
    //       this.mapToDouble(doc);
    //     });
    //   }).subscribe((betsz: DoubleBet[]) => {
    //     this.doubleBets = betsz;
    //     this.dailyDoublesChanged.next([...this.doubleBets]);
    //   }));
    // return this.doubleBets.slice();
  }

  updateBet(bet: Bet) {
  }
}
