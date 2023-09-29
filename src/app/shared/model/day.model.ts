import moment from 'moment';

export class Day {
  id: string;
  date: Date;
  matches: any[] = [];
  summary: string;
  result: number;
  verified: boolean;

  constructor(json: {}) {
    this.id = json['id'] ? json['id'] : Day.generateId(json['date']);
    this.date = json['date'] instanceof Date ? json['date'] : json['date'].toDate();
    const matchesJson = json['matches'];
    if (matchesJson) {
      for (const match of Object.keys(matchesJson)) {
        // this.matches.push(new Match(matchesJson[match]));
      }
    }
    this.summary = json['summary'] || '';
    this.result = json['result'] || 0;
    this.verified = json['verified'] || false;
  }

  public static generateId(time: Date) {
    return moment(time).format('YYYY-MM-DD');
  }

}
