import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BetService } from '../bet.service';
import {MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import { Bookie } from '../bookie.enum';
import { BetType } from '../bet-type.enum';
import { Outcome } from '../outcome.enum';
import {CalculationsService} from '../calculations.service';

@Component({
  selector: 'app-new-bet',
  templateUrl: './new-bet.component.html',
  styleUrls: ['./new-bet.component.css']
})
export class NewBetComponent {
  public bookies = Bookie;
  public betTypes = BetType;
  public outcomes = Outcome;
  public awaitingOutcome = Outcome.awaiting;

  constructor(private betService: BetService,
              private calculationService: CalculationsService,
              private snackbar: MatSnackBar) { }

  onNewBet(form: NgForm) {
    console.log(form.value);
    this.calculationService.determineReturns(form.value);
    this.betService.addBet(form.value);
    form.reset();
    this.snackbar.open('New bet registered!', null, {
      duration: 3000
    });
  }

  getProjectedReturns(form: NgForm) {
    const outcome = form.value.outcome;
    const odds = form.value.odds;
    const stake = form.value.stake;
    if (outcome === 'win' ) {
      return odds * stake - stake;
    } else if (outcome === 'halfWin') {
      return (odds * stake - stake) / 2;
    } else if (outcome === 'halfLoss') {
      return -stake / 2;
    } else if (outcome === 'loss') {
      return -stake;
    }
    return 0;
  }

}
