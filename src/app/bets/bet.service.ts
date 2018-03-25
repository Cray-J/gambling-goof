import { Bet } from './bet.model';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BetType } from './bet-type.enum';
import { betDateComparator } from './comparators';

@Injectable()
export class BetService {
  private dailySingles: Bet[] = [];
  private dailyWebSingles: Bet[] = [];
  private minorPlays: Bet[] = [];
  private doubleBets: Bet[] = [];
  private seasonBets: Bet[] = [];
  private unitBets: Bet[] = [];

  dailySinglesChanged = new Subject<Bet[]>();
  dailyWebSinglesChanged = new Subject<Bet[]>();
  minorPlaysChanged = new Subject<Bet[]>();
  seasonBetsChanged = new Subject<Bet[]>();
  unitBetsChanged = new Subject<Bet[]>();
  private fbSubs: Subscription[] = [];
  public currentTab = new Subject<string>();
  dailyDoublesChanged = new Subject<Bet[]>();


  constructor(private db: AngularFirestore) {}

  public addBet(bet: Bet) {

    switch (BetType[bet.betType]) {
      case BetType.dailySingle:
        this.db.collection(bet.betType).add(bet);
        this.dailySingles.push(bet);
        this.dailySinglesChanged.next(this.dailySingles);
        break;
      case BetType.dailyDouble:
        this.db.collection(bet.betType).add(bet);
        this.doubleBets.push(bet);
        this.dailyDoublesChanged.next(this.doubleBets);
        break;
      case BetType.dailyWebSingle:
        this.db.collection(bet.betType).add(bet);
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

  public getMinorBets(): Bet[] {
    return this.minorPlays.slice();
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
          const tempBet = doc.payload.doc.data() as Bet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;
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


  public fetchDoubles(): Bet[] {
    this.fbSubs.push(this.db
      .collection('dailyDouble')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const tempBet = doc.payload.doc.data() as Bet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;
        });
      }).subscribe((bets: Bet[]) => {
      console.log(bets);
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
}
