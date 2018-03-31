import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { Bank } from '../bets/bank.model';
import {Bookie} from "../bets/bookie.enum";
import {BetService} from "../bets/bet.service";
import {Bet} from "../bets/bet.model";

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bank: Bank;
  doubles: Bet[];

  constructor(private bankService: BankService, private betService: BetService) { }

  ngOnInit() {
    this.bank = this.bankService.getBookies();
    this.doubles = this.betService.fetchDoubles();

  }

  getBookies() {
    return this.bank.bookies;
  }

  getWins(bookie: Bookie) {
   // this.bank.bookies.find(bookie)
  }

  getLosses() {

  }

  getRefunds() {

  }

  getDailyWins() {
    let wins = 0;
    for (const double of this.doubles) {
      wins += double.valueReturn;
    }
    return wins;
  }

}
