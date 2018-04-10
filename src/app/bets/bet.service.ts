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

  private multiBets: MultiBet[] = [];
  private singleBets: SingleBet[] = [];
  singleBetsChanged = new Subject<SingleBet[]>();
  multiBetsChanged = new Subject<MultiBet[]>();

  private fbSubs: Subscription[] = [];


  constructor(private db: AngularFirestore) {
  }

  public addBet(bet: SingleBet) {
    // this.db.collection('singleBets').add(bet);
    this.db.collection('singleBets').doc(bet.id).set(bet);
    // this.db.ref.child('singleBets').child(bet.id).set(bet);
    this.singleBets.push(bet);
    this.singleBetsChanged.next(this.singleBets);
  }

  public addMultiBet(bet: MultiBet) {
    this.db.collection('multiBets').add(bet);
    this.multiBets.push(bet);
    this.multiBetsChanged.next(this.multiBets);
  }

  getSingleBets(): SingleBet[] {
    return this.singleBets.slice();
  }

  public getMultiBets(): MultiBet[] {
    return this.multiBets.slice();
  }

  public fetchSingleBets() {
    this.fbSubs.push(this.db
      .collection('singleBets')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const tempBet = doc.payload.doc.data() as SingleBet;
          // tempBet.id = doc.payload.doc.id;
          return tempBet;
        });
      }).subscribe((bets: SingleBet[]) => {
        bets.sort(betDateComparator());
        this.singleBets = bets;
        console.log(this.singleBets);
        this.singleBetsChanged.next([...this.singleBets]);
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

  updateBet(bet: SingleBet) {
    console.log(bet);
    this.db.collection('singleBets').doc(bet.id).set(bet);
  }

  updateMultiBet(bet: MultiBet) {
    this.db.collection(bet.betType).doc(bet.id).update(bet);
  }
}
