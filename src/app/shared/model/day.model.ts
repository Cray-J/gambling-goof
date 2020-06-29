import { Match } from './match.model';

export class Day {
  id: string;
  date: Date;
  matches: Match[];
  summary: string;
  result: number;
  verified: boolean;

  constructor(json: {}) {
    this.id = json['id'] ? json['id'] : Day.generateId(json['date']);
    this.date = json['date'];
    this.matches = json['matches'];
    this.summary = json['summary'];
    this.result = json['result'];
    this.verified = json['verified'];
  }

  public static generateId(time: Date) {
    const day = time.getUTCDate() < 10 ? `0${time.getUTCDate()}` : time.getUTCDate();
    const month = time.getMonth() < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
    const year = time.getFullYear();
    const id = `${year}${month}${day}`;
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
    const matches = this.matches.map(obj => Object.assign({}, obj));
    this.calculateResult();
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
