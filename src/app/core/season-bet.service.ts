import { Injectable } from '@angular/core';
import { SeasonBet } from '../shared/model/season-bet.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Bet } from '../shared/model/bet.model';
import { dateComparator } from '../shared/comparators';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class SeasonBetService {
  private seasonBets: SeasonBet[] = [];
  betsChanged = new Subject<SeasonBet[]>();
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  public addBet(bet: SeasonBet) {
    bet.id = SeasonBet.generateId(bet.placedDate);
    this.db
      .collection('seasonBets')
      .doc(bet.id)
      .set(bet.prepareSave())
      .then(result => {
        this.seasonBets.push(bet);
        this.betsChanged.next(this.seasonBets);
      });
  }

  public fetchSingleBets() {
    this.fbSubs.push(
      this.db
        .collection('seasonBets')
        .snapshotChanges()
        .pipe(map(docArray =>
          docArray.map(doc => doc.payload.doc.data(),
         )))
        .pipe(SeasonBet.fromJsonArray)
        .subscribe((bets: SeasonBet[]) => {
          console.log(bets);
          bets.sort(dateComparator());
          this.seasonBets = bets;
          this.betsChanged.next([...this.seasonBets]);
        })
    );
  }

  updateBet(bet: Bet) {
    this.db
      .collection('seasonBets')
      .doc(bet.id)
      .update(bet)
      .then(val => {
        console.log(val);
      });
  }
}
