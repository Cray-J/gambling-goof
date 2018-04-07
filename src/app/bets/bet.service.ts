import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BetType } from './bet-type.enum';
import { betDateComparator } from './comparators';
import { MultiBet } from './bet.model';
import { SingleBet } from './singlebet.model';

@Injectable()
export class BetService {
  private dailySingles: SingleBet[] = [];
  private multiBets: MultiBet[] = [];
  private doubleBets: MultiBet[] = [];
  private seasonBets: SingleBet[] = [];
  private unitBets: SingleBet[] = [];

  dailySinglesChanged = new Subject<SingleBet[]>();
  multiBetsChanged = new Subject<MultiBet[]>();
  seasonBetsChanged = new Subject<SingleBet[]>();
  unitBetsChanged = new Subject<SingleBet[]>();
  private fbSubs: Subscription[] = [];
  public currentTab = new Subject<string>();
  dailyDoublesChanged = new Subject<MultiBet[]>();


  constructor(private db: AngularFirestore) {}

  public addBet(bet: SingleBet) {
    switch (BetType[bet.betType]) {
      case BetType.dailySingle:
        this.db.collection(bet.betType).add(bet);
        this.dailySingles.push(bet);
        this.dailySinglesChanged.next(this.dailySingles);
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

  public addMultiBet(bet: MultiBet) {
    switch (BetType[bet.betType]) {
      case BetType.dailyDouble:
        this.db.collection(bet.betType).add(bet);
        this.doubleBets.push(bet);
        this.dailyDoublesChanged.next(this.doubleBets);
        break;
      case BetType.multibet:
        this.db.collection(bet.betType).add(bet);
        this.multiBets.push(bet);
        this.multiBetsChanged.next(this.multiBets);
        break;
    }

  }

  public getDailyBets(): SingleBet[] {
    return this.dailySingles.slice();
  }

  public getSeasonBets(): SingleBet[] {
    return this.seasonBets.slice();
  }

  public getUnitBets(): SingleBet[] {
    return this.unitBets.slice();
  }

  public getMultiBets(): MultiBet[] {
    return this.multiBets.slice();
  }

  public fetchDailyBets(): void {
    this.fbSubs.push(this.db
      .collection('dailySingle')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const tempBet = doc.payload.doc.data() as SingleBet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;
        });
      }).subscribe((bets: SingleBet[]) => {
        bets.sort(betDateComparator());
        this.dailySingles = bets;
        this.dailySinglesChanged.next([...this.dailySingles]);
      }));
  }

  public fetchMultiBets(): MultiBet[] {
    this.fbSubs.push(this.db
      .collection('minorBets')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const tempBet = doc.payload.doc.data() as MultiBet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;

        });
      }).subscribe((bets: MultiBet[]) => {
        bets.sort(betDateComparator());
        this.multiBets = bets;
        this.multiBetsChanged.next([...this.multiBets]);
      }));
    return this.multiBets.slice();
  }

  public fetchSeasonBets(): SingleBet[] {
    this.fbSubs.push(this.db
      .collection('seasonBet')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const tempBet = doc.payload.doc.data() as SingleBet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;
        });
      }).subscribe((bets: SingleBet[]) => {
      bets.sort(betDateComparator());
      this.seasonBets = bets;
      this.seasonBetsChanged.next( [...this.seasonBets]);
      }));
    return this.seasonBets.slice();
  }

  public fetchUnitBets(): SingleBet[] {
    this.fbSubs.push(this.db
      .collection('unitBet')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const tempBet = doc.payload.doc.data() as SingleBet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;

        });
      }).subscribe((bets: SingleBet[]) => {
        bets.sort(betDateComparator());
        this.unitBets = bets;
        this.unitBetsChanged.next( [...this.unitBets]);
      }));
    return this.unitBets.slice();
  }


  public fetchDoubles(): MultiBet[] {
    this.fbSubs.push(this.db
      .collection('dailyDouble')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const tempBet = doc.payload.doc.data() as MultiBet;
          tempBet.id = doc.payload.doc.id;
          return tempBet;
        });
      }).subscribe((bets: MultiBet[]) => {
        bets.sort(betDateComparator());
        this.doubleBets = bets;
        this.dailyDoublesChanged.next([...this.doubleBets]);
      }));
    return this.doubleBets.slice();
  }

  updateBet(bet: SingleBet) {
    console.log(bet.betType);
    this.db.collection(bet.betType).doc(bet.id).update(bet);
  }

  updateMultiBet(bet: MultiBet) {
    this.db.collection(bet.betType).doc(bet.id).update(bet);
  }
}
