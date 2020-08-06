import { Component, OnInit } from '@angular/core';
import { DayService } from './core/day.service';
import { SeasonBetService } from './core/season-bet.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private daysService: DayService,
    private seasonBetService: SeasonBetService,
  ) {}

  ngOnInit() {
    this.seasonBetService.fetchSingleBets();
    this.daysService.getDays();
  }
}
