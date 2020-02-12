import { Component, OnInit } from '@angular/core';
import { BetService } from './core/bet.service';
import { TeamsService } from './core/teams.service';
import { DayService } from './core/day.service';


@Component({
  selector: 'root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private betService: BetService,
              private teamsService: TeamsService,
              private daysService: DayService) {}

  ngOnInit() {
    this.betService.fetchSingleBets();
    this.daysService.getDays();
    this.teamsService.fetchTeams();
  }
}

