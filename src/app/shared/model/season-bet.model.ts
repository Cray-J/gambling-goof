import { Bet } from './bet.model';
import { BetType } from './bet-type.enum';

export class SeasonBet extends Bet {
  settledDate: Date;
  betType = BetType.season;

  constructor(json) {
    super(json);
    this.settledDate = json.settledDate;
  }

}
