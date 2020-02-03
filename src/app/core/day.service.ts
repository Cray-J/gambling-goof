import { Injectable } from '@angular/core';
import { Day } from '../shared/model/day.model';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { AngularFirestore } from '@angular/fire/firestore';
import { dateComparator } from '../shared/comparators';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DayService {
  private  days: Day[] = [];
  daysChanged = new Subject<Day[]>();
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {
  }

  public save(day: Day) {
    this.db.collection('days').doc(day.id).set(day);
    this.days.push(day);
    this.daysChanged.next(this.days);
  }

  public getDays() {
    this.fbSubs.push(
      this.db
        .collection('days')
        .snapshotChanges()
        .pipe(map(docArray => {
          return docArray.map(doc => {
            return doc.payload.doc.data() as Day;
          });
        })).subscribe((days: Day[]) => {
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
