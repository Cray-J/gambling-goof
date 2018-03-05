import { Component, OnInit } from '@angular/core';
import {BetService} from "../bets/bet.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private betService: BetService) { }

  ngOnInit() {
  }

  getNumberOfBets() {
    return this.betService.getDailyBets().length;
  }

  getTotal() {
    let total = 0;

    for (const bet of this.betService.getDailyBets()) {
      total += bet.valueReturn;
    }
    return total;
  }

}
