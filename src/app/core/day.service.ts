import { Injectable } from '@angular/core';
import { Day } from '../shared/model/day.model';
import { Subscription } from 'rxjs/internal/Subscription';
// import { AngularFirestore } from '@angular/fire/firestore';
import { dateComparator } from '../shared/comparators';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Match } from '../shared/model/match.model';

@Injectable({ providedIn: 'root' })
export class DayService {
  private days: Day[] = [];
  daysChanged = new ReplaySubject<Day[]>();
  private fbSubs: Subscription[] = [];

  // constructor(private db: AngularFirestore) {}

  public save(day) {
    const existingDay = this.days.find(p => p.id === day.id);
    console.log(existingDay, day);
    if (existingDay) {
      console.log('found day');
      day.matches.forEach((match: Match) => {
        const existingMatch = existingDay.matches.find(p => p.home === match.home && p.away === match.away);
        existingMatch ? existingMatch.bets.push(...match.bets) : existingDay.matches.push(match);
      });
      console.log('Trying to save', existingDay.prepareSave());
      // this.db
      //   .collection('days')
      //   .doc(existingDay.id)
      //   .set(existingDay.prepareSave())
      //   .then(result => console.log('Updated:', result));
    } else {
      console.log('did not find day, saving', day.prepareSave());
      this.days.push(day);
      // this.db
      //   .collection('days')
      //   .doc(day.id)
      //   .set(day.prepareSave())
      //   .then(result => console.log('Saved:', result));
    }
    this.daysChanged.next(this.days);
  }

  public getDays() {
    console.log('getDays');
    // this.fbSubs.push(
    //   this.db
    //     .collection('days')
    //     .snapshotChanges()
    //     .pipe(map(docArray => docArray.map(doc => new Day(doc.payload.doc.data()))))
    //     .pipe(Day.fromJsonArray)
    //     .subscribe((days: Day[]) => {
    //       console.log('response', days);
    //       days.sort(dateComparator());
    //       this.days = days;
    //       this.daysChanged.next([...this.days]);
    //     })
    // );
  }

  public update(day: Day) {
    // this.db
    //   .collection('days')
    //   .doc(day.id)
    //   .set(day.prepareSave())
    //   .then(val => {
    //     console.log(val);
    //   });
  }
}
