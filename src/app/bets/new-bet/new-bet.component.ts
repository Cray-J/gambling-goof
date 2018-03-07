import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bet } from '../bet.model';
import { BetService } from '../bet.service';
import { MatPaginator, MatSort } from '@angular/material';
import { Bookie } from '../bookie.enum';
import { BetType } from '../bet-type.enum';
import { Outcome } from '../outcome.enum';

@Component({
  selector: 'app-new-bet',
  templateUrl: './new-bet.component.html',
  styleUrls: ['./new-bet.component.css']
})
export class NewBetComponent implements OnInit {
  bets: Bet[] = [];
  public bookies = Bookie;
  public betTypes = BetType;
  public outcomes = Outcome;

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
