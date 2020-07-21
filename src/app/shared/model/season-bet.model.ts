import { Bet } from './bet.model';
import { BetType } from './bet-type.enum';
import { SeasonBetType } from './season-bet-type.enum';
import { Bookie } from './bookie.enum';
import { Outcome } from './outcome.enum';
import moment from 'moment';

export class SeasonBet extends Bet {
  settledDate: Date;
  placedDate: Date;
  betType = BetType.season;
  subtype: SeasonBetType;

  constructor(json) {
    super(json);
    this.settledDate = json.settledDate;
    this.placedDate = json.placedDate;
    this.subtype = json.subtype;
  }

  public prepareSave() {
     return {
      id: this.id,
      settledDate: this.settledDate,
      placedDate: this.placedDate,
      betType: this.betType,
      subType: this.subtype,
      selection: this.selection,
      stake: this.stake,
      odds: this.odds,
      bookie: this.bookie,
      outcome: this.outcome,
      valueReturn: this.valueReturn,
      league: this.league,
      verifiedResult: this.verifiedResult || false
    };
  }

  public static generateId(time: Date) {
    const day = time.getUTCDate() < 10 ? `0${time.getUTCDate()}` : time.getUTCDate();
    const month = time.getMonth() < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
    console.log(moment(time).format('YYYY-MM-DD:mm'));
    return moment(time).format('YYYY-MM-DD-HH:mm');
  }
}
