import { SeasonBet } from './season-bet.model';

export class WinnerSeasonBet extends SeasonBet {
  remainingOpponents = [];

  constructor(json) {
    super(json);
    this.remainingOpponents = json.remainingOpponents;
  }

  prepareSave() {
    return {
      ...super.prepareSave(),
      remainingOpponents: this.remainingOpponents
    };
  }

}
