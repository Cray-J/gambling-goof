import { Component, OnInit } from '@angular/core';
import { BetService } from './core/bet.service';
import { TeamsService } from './core/teams.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private betService: BetService,
              private teamsService: TeamsService) {}

  ngOnInit() {
    this.betService.fetchSingleBets();
    this.teamsService.fetchTeams();
  }
}

