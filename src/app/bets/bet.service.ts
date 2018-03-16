import { Bet } from './bet.model';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BetType } from './bet-type.enum';
import { DoubleBet } from './doubleBet.model';
import { betDateComparator } from './comparators';

@Injectable()
export class BetService {
  private dailySingles: Bet[] = [];
  private dailyWebSingles: Bet[] = [];
  private minorPlays: Bet[] = [];
  private doubleBets: DoubleBet[] = [];
  private seasonBets: Bet[] = [];
  private unitBets: Bet[] = [];

  dailySinglesChanged = new Subject<Bet[]>();
  dailyWebSinglesChanged = new Subject<Bet[]>();
  minorPlaysChanged = new Subject<Bet[]>();
  seasonBetsChanged = new Subject<Bet[]>();
  unitBetsChanged = new Subject<Bet[]>();
  private fbSubs: Subscription[] = [];
  public currentTab = new Subject<string>();
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
      case BetType.seasonBet:
        this.db.collection(bet.betType).add(bet);
        this.seasonBets.push(bet);
        this.seasonBetsChanged.next(this.seasonBets);
        break;
      case BetType.unitBet:
        this.db.collection(bet.betType).add(bet);
        this.unitBets.push(bet);
        this.unitBetsChanged.next(this.unitBets);
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

  public getSeasonBets(): Bet[] {
    return this.seasonBets.slice();
  }

  public getUnitBets(): Bet[] {
    return this.unitBets.slice();
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
          const tempBet = doc.payload.doc.data() as Bet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;
        });
      }).subscribe((bets: Bet[]) => {
        bets.sort(betDateComparator());
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
          const tempBet = doc.payload.doc.data() as Bet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;
        });
      }).subscribe((bets: Bet[]) => {
        bets.sort(betDateComparator());
        this.dailySingles = bets;
        this.dailySinglesChanged.next([...this.dailySingles]);
      }));
  }

  public fetchMinorPlays(): Bet[] {
    this.fbSubs.push(this.db
      .collection('minorPlay')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const tempBet = doc.payload.doc.data() as Bet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;

        });
      }).subscribe((bets: Bet[]) => {
        bets.sort(betDateComparator());
        this.minorPlays = bets;
        this.minorPlaysChanged.next([...this.minorPlays]);
      }));
    return this.minorPlays.slice();
  }

  public fetchSeasonBets(): Bet[] {
    this.fbSubs.push(this.db
      .collection(BetType.seasonBet)
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return this.mapToBet(doc);
        });
      }).subscribe((bets: Bet[]) => {
      bets.sort(betDateComparator());
      this.seasonBets = bets;
      this.seasonBetsChanged.next( [...this.seasonBets]);
      }));
    return this.seasonBets.slice();
  }

  public fetchUnitBets(): Bet[] {
    this.fbSubs.push(this.db
      .collection('unitBet')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const tempBet = doc.payload.doc.data() as Bet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;

        });
      }).subscribe((bets: Bet[]) => {
        bets.sort(betDateComparator());
        this.unitBets = bets;
        this.unitBetsChanged.next( [...this.unitBets]);
      }));
    return this.unitBets.slice();
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
        bets.sort(betDateComparator());
        this.doubleBets = bets;
        this.dailyDoublesChanged.next([...this.doubleBets]);
      }));
    return this.doubleBets.slice();
  }

  updateBet(bet: Bet) {
    this.db.collection(bet.betType).doc(bet.id).update(bet);
  }

  updateMinorPlay(bet: Bet) {
    this.db.collection('minorPlay').doc(bet.id).update(bet);
  }


  updateUnitBet(bet: Bet) {
    this.db.collection('unitBet').doc(bet.id).update(bet);
  }
}
