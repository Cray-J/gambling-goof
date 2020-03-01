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
    const existingDay = this.days.find(p => p.id === day.id);
    if (existingDay) {
      debugger;
      console.log('updating existing day');
      day.matches.forEach(match => {
        const existingMatch = existingDay.matches.find(p => p.match === match.match);
        if (existingMatch) {
          console.log('updating match bets');
          existingMatch.bets.push(...match.bets);
        } else {
          console.log('adding new match');
          existingDay.matches.push(match);
        }
      });
      this.db.collection('days').doc(existingDay.id).set(existingDay).then(result => {
        console.log('Updated:', result);
      });
      // day.matches.push(...existingBets.matches);
      // index.bets.push(...day.bets);
    } else {
      console.log('Saving new day');
      this.days.push(day);
      this.db.collection('days').doc(day.id).set(day).then(result => {
        console.log('Saved:', result);
      });
    }
    console.log('saving in service: ', day.id, day);
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