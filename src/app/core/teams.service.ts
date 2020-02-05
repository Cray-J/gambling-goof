import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { betDateComparator } from '../shared/comparators';

@Injectable({providedIn: 'root'})
export class TeamsService {
  public teams: string[] = [];
  private teamsChanged = new Subject<string[]>();
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {

  }

  public addTeam(team: string) {
    this.db.collection('teams').add({name: team});
    this.teams.push(team);
    this.teamsChanged.next(this.teams);
    console.log(this.teams);
  }

  public fetchTeams() {
    this.fbSubs.push(this.db
      .collection('teams')
      .snapshotChanges().pipe(
        map(docArray => {
          return docArray.map(doc => {
            return doc.payload.doc.data() as string;
          });
        }))
      .subscribe((teams: string[]) => {
        teams.sort(betDateComparator());
        this.teams = teams;
        this.teamsChanged.next([...this.teams]);
      }));
  }
}
