import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { nameComparator } from '../shared/comparators';
import { Team } from '../shared/model/team.model';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  public teams: Team[] = [];
  public teamsChanged = new Subject<Team[]>();
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  public addTeam(team: Team) {
    this.db.collection('teams').add({ name: team });
    this.teams.push(team);
    this.teamsChanged.next(this.teams);
    console.log(this.teams);
  }

  public fetchTeams() {
    this.fbSubs.push(
      this.db
        .collection('teams')
        .snapshotChanges()
        .pipe(map(docArray => docArray.map(doc => doc.payload.doc.data() as Team)))
        .subscribe((teams: Team[]) => {
          teams.sort(nameComparator());
          this.teams = teams;
          this.teamsChanged.next([...this.teams]);
        })
    );
  }
}
