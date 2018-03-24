import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BetService } from '../bet.service';
import { MatSnackBar } from '@angular/material';
import { Outcome } from '../outcome.enum';
import { Bookie } from '../bookie.enum';
import { Bet } from '../bet.model';
import { DoubleBet } from '../doubleBet.model';
import { CalculationsService } from "../calculations.service";
import {BetType} from "../bet-type.enum";
import {MultiBetPart} from "../multi-bet-part.model";

@Component({
  selector: 'app-new-double',
  templateUrl: './new-double.component.html',
  styleUrls: ['./new-double.component.css']
})
export class NewDoubleComponent implements OnInit {

  // bets: Bet[] = [];
  public bookies = Bookie;
  public outcomes = Outcome;
  public betTypes = BetType;
  public betPart: MultiBetPart[] = [];
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
        outcome: Outcome.awaiting
      };
    }
  }

  onNewBet(form: NgForm) {
    const bet: DoubleBet = {
      valueReturn: 0,
      bookie: form.value.bookie,
      stake: form.value.stake,
      odds: this.getOdds(form),
      date: form.value.date,
      bets: this.betPart
    };

    bet.valueReturn = this.calculationService.determineReturnsFromDouble(bet);

    this.betService.addDouble(bet);
    form.reset();
    this.snackbar.open('New double registered!', null, {
      duration: 3000
    });
  }

  getOdds(form: NgForm) {
    let odds = 1;
    for( let bet of this.betPart) {
      odds *=  bet.odds;
    }
    return odds;
  }



}
