import { Match } from './match.model';
import { OperatorFunction } from 'rxjs/internal/types';
import { Json } from '../json.model';
import moment from 'moment';

export class Day {
  static fromJsonArray: OperatorFunction<object, Day[]> = Json.asOperatorFunctionArray(Day);
  id: string;
  date: Date;
  matches: Match[] = [];
  summary: string;
  result: number;
  verified: boolean;

  constructor(json: {}) {
    this.id = json['id'] ? json['id'] : Day.generateId(json['date']);
    this.date = json['date'] instanceof Date ? json['date'] : json['date'].toDate();
    const matchesJson = json['matches'];
    if (matchesJson) {
      for (const match of Object.keys(matchesJson)) {
        this.matches.push(new Match(matchesJson[match]));
      }
    }
    this.summary = json['summary'] || '';
    this.result = json['result'] || 0;
    this.verified = json['verified'] || false;
  }

  public static generateId(time: Date) {
    return moment(time).format('YYYY-MM-DD');
  }

  public calculateResult() {
    let result = 0;
    this.matches.forEach(m =>
      m.bets.forEach(b => {
        result += b.valueReturn ? b.valueReturn : 0;
      })
    );
    this.result = result;
  }

  public prepareSave() {
    const matches = this.matches.map(obj => {
      obj.prepareSave();
      return Object.assign({}, obj)
    });
    // this.calculateResult();
    return {
      id: this.id,
      date: this.date,
      matches: matches,
      summary: this.summary,
      result: this.result,
      verified: this.verified
    };
  }
}
