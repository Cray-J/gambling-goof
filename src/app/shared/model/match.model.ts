import { Bet } from './bet.model';
import { LeaguesGroup } from '../leagues';

export class Match {
  id: string;
  home: string;
  away: string;
  match: string;
  date: Date;
  league: string;
  valueReturn: number;
  bets: Bet[] = [];

  constructor(json) {
    // this.id = json['id'];
    this.home = json['home'];
    this.away = json['home'];
    this.date = json['date'] instanceof Date ? json['date'] : json['date'].toDate();
    this.valueReturn = json.valueReturn || 0;
    this.league = json['league'];
    const betsJson = json['bets'];
    if (betsJson) {
      for (const match of Object.keys(betsJson)) {
        this.bets.push(new Bet(betsJson[match]));
      }
    }
  }

  prepareSave() {
    this.bets = this.bets.map(obj => Object.assign({}, obj));
  }
}
