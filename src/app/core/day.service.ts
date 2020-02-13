import { Injectable } from '@angular/core';
import { Day } from '../shared/model/day.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { AngularFirestore } from '@angular/fire/firestore';
import { dateComparator } from '../shared/comparators';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DayService {
  private  days: Day[] = [];
  daysChanged = new ReplaySubject<Day[]>();
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {
  }

  public save(day: Day) {
    this.db.collection('days').doc(day.id).set(day);
    const index = this.days.find(p => p.id === day.id);
    if (index) {
      // index.bets.push(...day.bets);
    } else {
      this.days.push(day);
    }
    this.daysChanged.next(this.days);
  }

  public getDays() {
    console.log('getDays');
    this.fbSubs.push(
      this.db
        .collection('days')
        .snapshotChanges()
        .pipe(map(docArray => {
          return docArray.map(doc => {
            const day = doc.payload.doc.data() as Day;
            return day;
          });
        })).subscribe((days: Day[]) => {
          console.log('response', days);
          days.sort(dateComparator());
          this.days = days;
          this.daysChanged.next([...this.days]);
      })
    );
  }

  public update(day: Day) {
    this.db.collection('days').doc(day.id).update(day).then(val => {
      console.log(val);
    });
  }
}
