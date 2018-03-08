import { Component, OnInit } from '@angular/core';
import {BetService} from "./bet.service";

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  constructor(private betservice: BetService) { }

  ngOnInit() {
  }

  updateSelectedBet(betType: string){
  console.log("inside updateSelected");
    this.betservice.currentSelectedBetType = betType;
    this.betservice.currentSelectedBetTypeChanged.next(this.betservice.currentSelectedBetType);
  }

}
