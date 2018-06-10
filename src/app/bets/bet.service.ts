import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { betDateComparator } from './comparators';
import { MultiBet } from './bet.model';
import { SingleBet } from './singlebet.model';

@Injectable()
export class BetService {

  private singleBets: SingleBet[] = [];
  betsChanged = new Subject<SingleBet[]>();
  private fbSubs: Subscription[] = [];


  constructor(private db: AngularFirestore) {
  }

  public addBet(bet: SingleBet) {
    // this.db.collection('singleBets').add(bet);
    this.db.collection('singleBets').doc(bet.id).set(bet);
    // this.db.ref.child('singleBets').child(bet.id).set(bet);
    this.singleBets.push(bet);
    this.betsChanged.next(this.singleBets);
  }

  getSingleBets(): SingleBet[] {
    return this.singleBets.slice();
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
        this.betsChanged.next([...this.singleBets]);
      }));
  }

  updateBet(bet: SingleBet) {
    this.db.collection('singleBets').doc(bet.id).set(bet);
  }
}
