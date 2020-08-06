import { Bet } from './bet.model';
import { BetType } from './bet-type.enum';
import { SeasonBetType } from './season-bet-type.enum';
import { Bookie } from './bookie.enum';
import { Outcome } from './outcome.enum';
import moment from 'moment';
import { OperatorFunction } from 'rxjs/internal/types';
import { Json } from '../json.model';

export class SeasonBet extends Bet {
  static fromJsonArray: OperatorFunction<object, SeasonBet[]> = Json.asOperatorFunctionArray(SeasonBet);
  settledDate: Date;
  placedDate: Date;
  betType = BetType.season;
  subtype: SeasonBetType;
  league: string;

  constructor(json) {
    super(json);
    this.settledDate = json['settledDate'] instanceof Date ? json['settledDate'] : json['settledDate'].toDate();
    this.placedDate = json['placedDate'] instanceof Date ? json['placedDate'] : json['placedDate'].toDate();
    this.subtype = json.subtype;
  }

  public prepareSave() {
     return {
      id: this.id,
      settledDate: this.settledDate,
      placedDate: this.placedDate,
      betType: this.betType,
      subtype: this.subtype,
      selection: this.selection,
      stake: this.stake,
      odds: this.odds,
      bookie: this.bookie,
      outcome: this.outcome,
      valueReturn: this.valueReturn,
      league: this.league,
      verifiedResult: this.verifiedResult || false,
    };
  }

  public static generateId(time: Date) {
    const day = time.getUTCDate() < 10 ? `0${time.getUTCDate()}` : time.getUTCDate();
    const month = time.getMonth() < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
    console.log(moment(time).format('YYYY-MM-DD:mm'));
    return `${moment(time).format('YYYY-MM-DD-HH:mm')} - ${SeasonBet.getRandomArbitrary(0, 1000)}` ; // add random number
  }

  private static getRandomArbitrary(min, max): number {
    return Math.random() * (max - min) + min;
  }

  private static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
}
