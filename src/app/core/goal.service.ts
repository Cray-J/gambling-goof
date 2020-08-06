import { Injectable } from '@angular/core';
import { Goal } from '../shared/model/goal.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({ providedIn: 'root' })
export class GoalService {
  private goals: Goal[] = [];
  goalsChanged = new Subject<Goal[]>();
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  public addGoal(goal: Goal) {
    this.db.collection('goals').doc(`${goal.date.getFullYear()}-${goal.date.getMonth()}`).set(goal);
    this.goals.push(goal);
    this.goalsChanged.next(this.goals);
  }
}
