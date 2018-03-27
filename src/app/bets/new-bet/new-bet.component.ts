import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BetService } from '../bet.service';
import { MatSnackBar } from '@angular/material';
import { Outcome } from '../outcome.enum';
import { Bookie } from '../bookie.enum';
import { Bet } from '../bet.model';
import { CalculationsService } from '../calculations.service';
import {BetType} from '../bet-type.enum';
import {BetSelection} from '../bet-selection.model';

@Component({
  selector: 'app-new-bet',
  templateUrl: './new-bet.component.html',
  styleUrls: ['./new-bet.component.css']
})
export class NewBetComponent implements OnInit {

  public bookies = Bookie;
  public outcomes = Outcome;
  public betTypes = BetType;
  public betPart: BetSelection[] = [];
  Arr = Array; // Array type captured in a variable
  num = 1;

  constructor(private betService: BetService,
              private calculationService: CalculationsService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  setNumber(val: any) {
    console.log(val.value);
    this.num = val.value;
    let num1: number;

    for (num1 = 0 ; num1 < this.num; num1++) {
      console.log(num1);
      this.betPart[num1] = {
        id: '',
        redCard: false,
        missedPen: false,
        match: '',
        selection: '',
        odds: 0,
        outcome: Outcome.awaiting,
        finalScore: ''
      };
    }
  }

  onNewBet(form: NgForm) {
    const bet: Bet = {
      id: '',
      valueReturn: 0,
      bookie: form.value.bookie,
      betType: form.value.betType,
      stake: form.value.stake,
      odds: this.getOdds(),
      date: form.value.date,
      bets: this.betPart
    };

    bet.valueReturn = this.calculationService.determineReturns(bet);

    console.log(bet);
    this.betService.addBet(bet);
    form.reset();
    this.snackbar.open('New bet registered!', null, {
      duration: 3000
    });
  }

  getOdds() {
    let odds = 1;
    for (const bet of this.betPart) {
      if (bet.odds != null) {
        odds *=  bet.odds;
      }
    }
    return odds;
  }

  getReturns(form: NgForm) {
    let odds = 1;
    const stake = form.value.stake;
    console.log(stake);

    for (const currBet of this.betPart) {
      console.log(currBet.outcome);
      if (Outcome[currBet.outcome] === Outcome.loss) {
        return -stake;
      } else if (Outcome[currBet.outcome] === Outcome.win) {
        console.log('matched on win');
        odds *= currBet.odds;
      } else if (Outcome[currBet.outcome] === Outcome.halfWin) {
        odds *=  ((currBet.odds - 1) / 2) + 1;
      } else if (Outcome[currBet.outcome] === Outcome.halfLoss) {
        odds *=   - (((currBet.odds - 1) / 2)) ;
      }
    }

    return stake * odds - stake;
  }



}
