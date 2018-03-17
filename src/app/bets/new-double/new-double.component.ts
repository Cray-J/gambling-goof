import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BetService } from '../bet.service';
import { MatSnackBar } from '@angular/material';
import { Outcome } from '../outcome.enum';
import { Bookie } from '../bookie.enum';
import { Bet } from '../bet.model';
import { DoubleBet } from '../doubleBet.model';
import { CalculationsService } from "../calculations.service";

@Component({
  selector: 'app-new-double',
  templateUrl: './new-double.component.html',
  styleUrls: ['./new-double.component.css']
})
export class NewDoubleComponent implements OnInit {

  bets: Bet[] = [];
  public bookies = Bookie;
  public outcomes = Outcome;

  constructor(private betService: BetService,
              private calculationService: CalculationsService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onNewBet(form: NgForm) {

    const bet: DoubleBet = {
      valueReturn: 0,
      bookie: form.value.bookie,
      stake: form.value.stake,
      odds: form.value.odds1 * form.value.odds2,
      date: form.value.date,
      bets: [{id: null,
        redCard: false,
        missedPen: false,
        match: form.value.match1,
        selection: form.value.selection1,
        odds: form.value.odds1,
        outcome: form.value.outcome1
      },
        {
          id: null,
          redCard: false,
          missedPen: false,
          match: form.value.match2,
          selection: form.value.selection2,
          odds: form.value.odds2,
          outcome: form.value.outcome2
        }
      ]
    };
    bet.valueReturn = this.calculationService.determineReturnsFromDouble(bet);

    this.betService.addDouble(bet);
    form.reset();
    this.snackbar.open('New double registered!', null, {
      duration: 3000
    });
  }

  getOdds(form: NgForm) {
    return form.value.odds1 * form.value.odds2;
  }



}
