import { SeasonBet } from './season-bet.model';

export class GoalScorerSeasonBet extends SeasonBet {
  progress: number;
  goal: number;

  constructor(json) {
    super(json);
    this.progress = json.progress || null;
    this.goal = json.goal || null;
  }

  prepareSave() {
    return {
      ...super.prepareSave(),
      progress: this.progress,
      goal: this.goal,
    }
  }

}
