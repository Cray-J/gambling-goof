import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bet } from '../bet.model';
import { BetService } from '../bet.service';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-new-bet',
  templateUrl: './new-bet.component.html',
  styleUrls: ['./new-bet.component.css']
})
export class NewBetComponent implements OnInit {
  bets: Bet[] = [];

  betTypes = [
    {value: 'daily_single', viewValue: 'Daily Single'},
    {value: 'daily_double', viewValue: 'Daily Double'},
    {value: 'daily_treble', viewValue: 'Daily Treble'},
    {value: 'daily_fivefold', viewValue: 'Daily Fivefold'},
    {value: 'eerste_divisie', viewValue: 'Eerste Divisie'},

  ];

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  outcomes = [
    {value: 'awaiting', viewValue: 'Awaiting'},
    {value: 'win', viewValue: 'Win'},
    {value: 'half_win', viewValue: 'Half Win'},
    {value: 'void', viewValue: 'Void'},
    {value: 'push', viewValue: 'Push'},
    {value: 'half_loss', viewValue: 'Half Loss'},
    {value: 'loss', viewValue: 'Loss'}
  ];

  bookies = [
    {value: 'bet365', viewValue: 'Bet365'},
    {value: 'unibet', viewValue: 'Unibet'},
    {value: 'coolbet', viewValue: 'CoolBet'},
    {value: 'paddypower', viewValue: 'PaddyPower'},
    {value: 'betfair', viewValue: 'Betfair'},
    {value: 'pinnacle', viewValue: 'Pinnacle'}
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private betService: BetService) { }

  ngOnInit() {
  }

  onNewBet(form: NgForm) {
    console.log(form.value);
    this.determineReturnVal(form);
    this.betService.addBet(form.value);
    //console.log(this.betService.getBets());
    form.reset();
  }

  determineReturnVal(form: NgForm) {
    const outcome = form.value.outcome;
    const odds = form.value.odds;
    const stake = form.value.stake;

    if (outcome === 'win' ) {
      form.value.valueReturn = odds * stake - stake;
    } else if (outcome === 'loss') {
      form.value.valueReturn = -stake;
    }

  }

  getOdds(form: NgForm) {
    return form.value.odds * form.value.stake;
  }

  getProjectedReturns(form: NgForm) {
    return form.value.odds * form.value.stake;

  }

}
