import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Day } from '../../shared/model/day.model';
import { DayService } from '../../core/day.service';
import { $enum } from 'ts-enum-util';
import { Bookie } from '../../shared/model/bookie.enum';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { leagues, LeaguesGroup } from '../../shared/leagues';
import { _filter } from '../bet-dialog/bet-dialog.component';

@Component({
  selector: 'app-new-day-dialog',
  templateUrl: './new-day-dialog.component.html',
  styleUrls: ['./new-day-dialog.component.scss']
})
export class NewDayDialogComponent implements OnInit {
  // https://stackblitz.com/edit/angular-dffny7?file=app/app.component.html
  // https://stackoverflow.com/questions/48436145/angular-reactive-forms-with-nested-form-arrays/48527939
  date = new FormControl(new Date());
  public bookies = $enum(Bookie).getKeys();
  public days: Day[];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewDayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dayService: DayService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      date: this.fb.control(new Date(), [Validators.required]),
      matches: this.fb.array([this.initMatch()])
    });
    this.form.valueChanges.subscribe(data => this.validateForm());
    this.validateForm();
  }

  public getDateField(): AbstractControl {
    return this.form.get('date');
  }

  public removeMatch(index: number) {
    (this.form.controls['matches'] as FormArray).removeAt(index);
  }

  public removeBet(match: AbstractControl, index: number) {
    (match['controls'].bets as FormArray).removeAt(index);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public isEvenNumber(index: number): boolean {
    return index % 2 === 0;
  }

  public onSubmit() {
    console.log('new-day-dialog', this.form.getRawValue());
    const time: Date = this.form.value['date'];
    const matches = this.form.value['matches'];
    let updatedMatches = [];
    matches.forEach(match => {
      console.log(match);
      const date = match.time.split(':');
      let newTime = new Date(time);
      console.log('newTime', newTime);
      let newDate = newTime.setHours(date[0], date[1]);
      console.log(new Date(newDate));
      match.date = new Date(newDate);
      match.league = '';
      // newDate = newDate.setMinutes(date[1]);
      console.log(newDate, match);
      updatedMatches.push(match);
      // match.date = time.setHours(date[0])
    });
    console.log(matches);

    const newDay = new Day({
      date: time,
      matches: updatedMatches,
      summary: '',
      result: 0,
      verified: false
    });

    this.dayService.save(newDay);
    this.dialogRef.close();
  }

  public initMatch() {
    return this.fb.group({
      time: ['', [Validators.required]],
      home: ['', [Validators.required]],
      away: ['', [Validators.required]],
      bets: this.fb.array([this.initBet()])
    });
  }

  public initBet() {
    return this.fb.group({
      bookie: ['', Validators.required],
      selection: ['', [Validators.required]],
      odds: [0, [Validators.required]], // , Validators.pattern('^\\d+\\.\\d{2}$')
      stake: ['100', [Validators.required, Validators.pattern('[0-9]{3}')]]
    });
  }

  public addMatch() {
    const control = <FormArray>this.form.controls['matches'];
    control.push(this.initMatch());
  }

  public addBet(ix) {
    const control = (<FormArray>this.form.controls['matches']).at(ix).get('bets') as FormArray;
    control.push(this.initBet());
  }

  public formErrors = {
    matches: this.matchesErrors()
  };

  public matchesErrors() {
    return [
      {
        X: '',
        bets: this.YsErrors()
      }
    ];
  }

  public YsErrors() {
    return [
      {
        Y1: '',
        Y2: ''
      }
    ];
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
