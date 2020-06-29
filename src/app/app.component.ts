import { Component, OnInit } from '@angular/core';
import { BetService } from './core/bet.service';
import { DayService } from './core/day.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private betService: BetService,
    private daysService: DayService
  ) {}

  ngOnInit() {
    this.betService.fetchSingleBets();
    this.daysService.getDays();
  }
}
