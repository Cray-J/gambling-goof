import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BetService} from '../bet.service';
import {MatSnackBar} from '@angular/material';
import {Outcome} from '../outcome.enum';
import {BetType} from '../bet-type.enum';
import {Bookie} from '../bookie.enum';
import {Bet} from '../bet.model';
import {MultiBetPart} from "../multi-bet-part.model";
import {DoubleBet} from "../doubleBet.model";

@Component({
  selector: 'app-new-double',
  templateUrl: './new-double.component.html',
  styleUrls: ['./new-double.component.css']
})
export class NewDoubleComponent implements OnInit {

  bets: Bet[] = [];
  public bookies = Bookie;
  public betTypes = BetType;
  public outcomes = Outcome;

  constructor(private betService: BetService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onNewBet(form: NgForm) {
    console.log(form.value);

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
    /*bet.bets.push({
      id: null,
      redCard: false,
      missedPen: false,
      match: form.value.match1,
      selection: form.value.selection1,
      odds: form.value.odds1,
      outcome: form.value.outcome1,
      betType: form.value.betType1
    },
      {
        id: null,
        redCard: false,
        missedPen: false,
        match: form.value.match2,
        selection: form.value.selection2,
        odds: form.value.odds2,
        outcome: form.value.outcome2,
        betType: form.value.betType2
      });*/
    console.log(bet);

    this.betService.addDouble(bet);
    form.reset();
    this.snackbar.open('New bet registered!', null, {
      duration: 3000
    });
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
    const outcome1 = form.value.outcome1;
    const outcome2 = form.value.outcome2;
    const odds1 = form.value.odds1;
    const odds2 = form.value.odds2;
    const stake = form.value.stake;

 //   console.log(outcome1);
 //   console.log(outcome2);
    if (outcome1 === 'loss' || outcome2 === 'loss') {
      return -stake;
    } else if (outcome1 === 'win') {
      if (outcome2 === 'win') {
          return stake * odds1 * odds2;
      } else if (outcome2 === 'halfWin') {
        return stake * odds1 + (stake * odds2 / 2);
      } else if (outcome2 === 'void' || outcome2 === 'push') {
        return stake * odds1;
      }
    } else if (outcome1 === 'halfWin' && outcome2 === 'halfWin') {
      return stake * outcome1 / 2 * outcome2 / 2;
    } else if (outcome1 === 'halfWin' && outcome2 === 'win') {

    }


/*
    if (outcome === 'win' ) {
      return odds * stake - stake;
    } else if (outcome === 'halfWin') {
      return (odds * stake - stake) / 2;
    } else if (outcome === 'halfLoss') {
      return -stake / 2;
    } else if (outcome === 'loss') {
      return -stake;
    }

*/
  }

}
