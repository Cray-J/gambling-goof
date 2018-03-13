import { Bet } from './bet.model';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BetType } from './bet-type.enum';
import { DoubleBet } from './double-bet.enum';

@Injectable()
export class BetService {
  private dailySingles: Bet[] = [];
  private dailyWebSingles: Bet[] = [];
  private eersteBets: Bet[] = [];
  private minorPlays: Bet[] = [];
  public currentSelectedBetType: string;
  dailySinglesChanged = new Subject<Bet[]>();
  dailyWebSinglesChanged = new Subject<Bet[]>();
  minorPlaysChanged = new Subject<Bet[]>();
  eersteBetsChanged = new Subject<Bet[]>();
  currentSelectedBetTypeChanged = new Subject<string>();
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
      case BetType.minorPlay:
        this.db.collection(bet.betType).add(bet);
        this.minorPlays.push(bet);
        this.minorPlaysChanged.next(this.minorPlays);
        break;
    }
  }

  public addDouble(doubleBet: DoubleBet) {
    this.db.collection(BetType.dailyDouble).add(doubleBet);
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
          return this.mapToBet(doc);
        });
      }).subscribe((exercises: Bet[]) => {
        this.eersteBets = exercises;
        this.eersteBetsChanged.next([...this.eersteBets]);
      }));
    return this.eersteBets.slice();
  }


  private mapToBet(doc) {
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
      redCard: doc.payload.doc.data().redCard
    };
  }

  public fetchDailyWebBets(): Bet[] {
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
    return this.eersteBets.slice();
  }

  public fetchMinorPlays(): Bet[] {
    this.fbSubs.push(this.db
      .collection('minorPlay')
      .snapshotChanges()
      .map(docArray => {
        console.log("Fetching from " + BetType.minorPlay);
        return docArray.map(doc => {
          return this.mapToBet(doc);
        });
      }).subscribe((bets: Bet[]) => {
        this.minorPlays = bets;
        this.minorPlaysChanged.next([...this.minorPlays]);
      }));
    return this.minorPlays.slice();
  }

  updateBet(bet: Bet) {
  }
}
