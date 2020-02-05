import { Subject ,  Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { dateComparator } from '../shared/comparators';
import { Bet } from '../shared/model/bet.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BetService {
  private singleBets: Bet[] = [];
  betsChanged = new Subject<Bet[]>();
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {
  }

  public addBet(bet) {
    // this.db.collection('singleBets').add(bet);
    this.db.collection('singleBets').doc(bet.id).set(bet).then(result => {
      this.singleBets.push(bet);
      this.betsChanged.next(this.singleBets);
    });
    // this.db.ref.child('singleBets').child(bet.id).set(bet);
  }

  public addBets(bets: Bet[]) {
    bets.forEach(bet => {
      this.db.collection('singleBets').doc(bet.id).set(bet);
      this.singleBets.push(bet);
    });
    this.betsChanged.next(this.singleBets);
  }

  getSingleBets(): Bet[] {
    return this.singleBets.slice();
  }

  public fetchSingleBets() {
    this.fbSubs.push(this.db
      .collection('singleBets')
      .snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return doc.payload.doc.data() as Bet;
        });
      })).subscribe((bets: Bet[]) => {
        bets.sort(dateComparator());
        this.singleBets = bets;
        this.betsChanged.next([...this.singleBets]);
      }));
  }

  updateBet(bet: Bet) {
    this.db.collection('singleBets').doc(bet.id).update(bet).then(val => {
      console.log(val);
    });
  }
}
