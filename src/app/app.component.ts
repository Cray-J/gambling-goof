import { Component, OnInit } from '@angular/core';
import { BetService } from './core/bet.service';
import { DayService } from './core/day.service';
import { SeasonBetService } from './core/season-bet.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private betService: BetService,
    private daysService: DayService,
    private seasonBetService: SeasonBetService,
  ) {}

  ngOnInit() {
    this.betService.fetchSingleBets();
    this.seasonBetService.fetchSingleBets();
    this.daysService.getDays();
  }
}
