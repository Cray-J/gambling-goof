import { Component, Inject, OnInit, } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BetService } from '../../core/bet.service';
import { Day } from '../../shared/model/day.model';
import { DayService } from '../../core/day.service';
import { $enum } from 'ts-enum-util';
import { Bookie } from '../../shared/model/bookie.enum';
import { Observable } from 'rxjs';
import { TeamsService } from '../../core/teams.service';

@Component({
  selector: 'app-new-day-dialog',
  templateUrl: './new-day-dialog.component.html',
  styleUrls: ['./new-day-dialog.component.scss']
})
export class NewDayDialogComponent implements OnInit {
 // https://stackblitz.com/edit/angular-dffny7?file=app/app.component.html
  // https://stackoverflow.com/questions/48436145/angular-reactive-forms-with-nested-form-arrays/48527939
  date = new FormControl(new Date());
  arr: FormArray;
  public bookies = $enum(Bookie).getKeys();
  filteredOptions: Observable<string[]>[] = [];
  public days: Day[];
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewDayDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private betsService: BetService,
              public dayService: DayService,
              private teamsService: TeamsService,
              private fb: FormBuilder) {
    // this.createFormGroup();
  }

  ngOnInit() {
    this.form = this.fb.group({
      date: this.fb.control(new Date()),
      matches: this.fb.array([
        this.initMatch()
      ])
    });
    this.form.valueChanges.subscribe(data => this.validateForm());
    this.validateForm();
  }

  public getDateField(): AbstractControl {
    return this.form.get('date');
  }

  public removeBet(match: AbstractControl, index: number) {
    (match.controls.bets as FormArray).removeAt(index);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public isEvenNumber(index: number): boolean {
    return index % 2 === 0;
  }

  public onSubmit() {
    console.log(this.form.getRawValue());
    const time: Date = this.form.value['date'];
    const currDay = time.getUTCDate();
    const day = time.getUTCDate();
    const month = time.getMonth() < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
    const year = time.getFullYear();
    const id = `${year}${month}${day}`;

    const matches = this.form.value['matches'];
    console.log(matches);

    const newDay: Day = {
      id: id,
      date: time,
      matches: this.form.value['matches'],
      summary: '',
      result: 0,
      verified: false
    };

    this.dayService.save(newDay);
    this.dialogRef.close();
  }

  public onSubmit1() {
    console.log(this.form.getRawValue());
    this.dialogRef.close();
    console.log(this.form.value);
    const time: Date = this.form.value['date'];
    console.log(time);
    const day = time.getDay() < 10 ? `0${time.getDay()}` : time.getDay();
    const month = time.getMonth() < 10 ? `0${time.getMonth()}` : time.getMonth();
    const year = time.getFullYear();
    const id = `${year}${month}${day}`;
    const bets = this.form.value['arr'];
    const newDay = new Day(id, time, []);
    console.log('bets: ', bets, newDay);
    bets.forEach(val => {
      if (val.home !== '') {
        const bet = {};
        this.updateTeams(val.home, val.away);
        bet['match'] = val.home + ' v ' + val.away;
        bet['selection'] = val.selection;
        bet['stake'] = val.stake;
        bet['odds'] = val.odds;
        bet['bookie'] = val.bookie;

        const firstTime = val.time;
        const splitTime = firstTime.split(':');
        console.log(time, splitTime);
        time.setHours(+splitTime[0], +splitTime[1]);
        bet['date'] = time;
        console.log(bet['date']);
        bet['id'] = '' + Date.now();
        newDay.bets.push(bet as Bet);
        this.betsService.addBet(bet);
      }
    });
    this.dayService.save(newDay);
    this.dialogRef.close();
  }

  initMatch() {
    return this.fb.group({
      'time': ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      'home': ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      'away': ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      'bets': this.fb.array([
        this.initBet()
      ])
    });
  }

  initBet() {
    return this.fb.group({
      bookie: [''],
      selection: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      odds: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      stake: ['']
    });
  }

  addMatch() {
    const control = <FormArray>this.form.controls['matches'];
    control.push(this.initMatch());
  }


  addBet(ix) {
    const control = (<FormArray>this.form.controls['matches']).at(ix).get('bets') as FormArray;
    control.push(this.initBet());
  }

  formErrors = {
    matches: this.matchesErrors()
  };


  matchesErrors() {
    return [{
      X: '',
      'bets': this.YsErrors()
    }];
  }

  YsErrors() {
    return [{
      Y1: '',
      Y2: ''
    }];
  }


  // validationMessages = {
  //   matches: {
  //     X: {
  //       required: 'X is required.',
  //       pattern: 'X must be 3 characters long.'
  //
  //     },
  //     Ys: {
  //       Y1: {
  //         required: 'Y1 is required.',
  //         pattern: 'Y1 must be 3 characters long.'
  //       },
  //       Y2: {
  //         required: 'Y2 is required.',
  //         pattern: 'Y2 must be 3 characters long.'
  //       }
  //     }
  //   }
  // };

  // form validation
  validateForm() {
    // console.log('validateForm');
    // for (let field in this.formErrors) {
    //   this.formErrors[field] = '';
    //   let input = this.register_readers.get(field);
    //   if (input.invalid && input.dirty) {
    //     for (let error in input.errors) {
    //       this.formErrors[field] = this.validationMessages[field][error];
    //     }
    //   }
    // }
    // this.validateMatches();
  }
  // validateMatches() {
  //   let XsA = <FormArray>this.form['controls'].matches;
  //   console.log('validateMatches');
  //   // console.log(XsA.value);
  //   this.formErrors.matches = [];
  //   let x = 1;
  //   while (x <= XsA.length) {
  //     this.formErrors.matches.push({
  //       X: '',
  //       Ys: [{
  //         Y1: '',
  //         Y2: ''
  //       }]
  //     });
  //     let X = <FormGroup>XsA.at(x - 1);
  //     console.log('X--->');
  //     console.log(X.value);
  //     for (let field in X.controls) {
  //       let input = X.get(field);
  //       console.log('field--->');
  //       console.log(field);
  //       if (input.invalid && input.dirty) {
  //         for (let error in input.errors) {
  //           this.formErrors.matches[x - 1][field] = this.validationMessages.matches[field][error];
  //         }
  //       }
  //     }
  //     this.validateYs(x);
  //     x++;
  //   }
  //
  // }

  // validateYs(x) {
  //   console.log('validateYs');
  //   let YsA = (<FormArray>this.form.controls['Xs']).at(x - 1).get('Ys') as FormArray;
  //   this.formErrors.Xs[x - 1].Ys = [];
  //   let y = 1;
  //   while (y <= YsA.length) {
  //     this.formErrors.Xs[x - 1].Ys.push({
  //       Y1: '',
  //       Y2: ''
  //     });
  //     let Y = <FormGroup>YsA.at(y - 1);
  //     for (let field in Y.controls) {
  //       let input = Y.get(field);
  //       if (input.invalid && input.dirty) {
  //         for (let error in input.errors) {
  //           this.formErrors.Xs[x - 1].Ys[y - 1][field] = this.validationMessages.Xs.Ys[field][error];
  //
  //         }
  //
  //       }
  //     }
  //     y++;
  //   }
  // }
}

