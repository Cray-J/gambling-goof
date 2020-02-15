import { Component, Inject, OnInit, } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bet } from '../../shared/model/bet.model';
import { BetService } from '../../core/bet.service';
import { Day } from '../../shared/model/day.model';
import { DayService } from '../../core/day.service';
import { $enum } from 'ts-enum-util';
import { Bookie } from '../../shared/model/bookie.enum';
import { Observable } from 'rxjs';
import { TeamsService } from '../../core/teams.service';
import { map, startWith } from 'rxjs/operators';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-new-day-dialog',
  templateUrl: './new-day-dialog.component.html',
  styleUrls: ['./new-day-dialog.component.scss']
})
export class NewDayDialogComponent implements OnInit {
 // https://stackblitz.com/edit/angular-dffny7?file=app/app.component.html
  // https://stackoverflow.com/questions/48436145/angular-reactive-forms-with-nested-form-arrays/48527939
  date = new FormControl(new Date());
  myForm: FormGroup;
  arr: FormArray;
  public bookies = $enum(Bookie).getKeys();
  filteredOptions: Observable<string[]>[] = [];
  public days: Day[];

  constructor(public dialogRef: MatDialogRef<NewDayDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private betsService: BetService,
              public dayService: DayService,
              private teamsService: TeamsService,
              private fb: FormBuilder) {
    // this.createFormGroup();
  }

  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      'Xs': this.fb.array([
        this.initX()
      ])
    });
    this.form.valueChanges.subscribe(data => this.validateForm());
    this.validateForm();
  }

  initX() {
    return this.fb.group({
      //  ---------------------forms fields on x level ------------------------
      'X': ['X', [Validators.required, Validators.pattern('[0-9]{3}')]],
      // ---------------------------------------------------------------------
      'Ys': this.fb.array([
        this.initY()
      ])
    });
  }

  initY() {
    return this.fb.group({
      //  ---------------------forms fields on y level ------------------------
      'Y1': ['Y1', [Validators.required, Validators.pattern('[0-9]{3}')]],
      'Y2': ['Y2', [Validators.required, Validators.pattern('[0-9]{3}')]],
      // ---------------------------------------------------------------------
    });
  }

  addX() {
    const control = <FormArray>this.form.controls['Xs'];
    control.push(this.initX());
  }


  addY(ix) {
    const control = (<FormArray>this.form.controls['Xs']).at(ix).get('Ys') as FormArray;
    control.push(this.initY());
  }

  formErrors = {
    Xs: this.XsErrors()
  };


  XsErrors() {
    return [{
      //  ---------------------forms errors on x level ------------------------
      X: '',

      // ---------------------------------------------------------------------
      'Ys': this.YsErrors()

    }]

  }

  YsErrors() {
    return [{
      //  ---------------------forms errors on y level ------------------------
      Y1: '',
      Y2: ''
      // ----------------------------------------------------------------------
    }];
  }


  validationMessages = {
    Xs: {
      X: {
        required: 'X is required.',
        pattern: 'X must be 3 characters long.'

      },
      Ys: {
        Y1: {
          required: 'Y1 is required.',
          pattern: 'Y1 must be 3 characters long.'
        },
        Y2: {
          required: 'Y2 is required.',
          pattern: 'Y2 must be 3 characters long.'
        }
      }
    }
  };

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
    this.validateXs();
  }
  validateXs() {
    let XsA = <FormArray>this.form['controls'].Xs;
    console.log('validateXs');
    // console.log(XsA.value);
    this.formErrors.Xs = [];
    let x = 1;
    while (x <= XsA.length) {
      this.formErrors.Xs.push({
        X: '',
        Ys: [{
          Y1: '',
          Y2: ''
        }]
      });
      let X = <FormGroup>XsA.at(x - 1);
      console.log('X--->');
      console.log(X.value);
      for (let field in X.controls) {
        let input = X.get(field);
        console.log('field--->');
        console.log(field);
        if (input.invalid && input.dirty) {
          for (let error in input.errors) {
            this.formErrors.Xs[x - 1][field] = this.validationMessages.Xs[field][error];
          }
        }
      }
      this.validateYs(x);
      x++;
    }

  }

  validateYs(x) {
    console.log('validateYs');
    let YsA = (<FormArray>this.form.controls['Xs']).at(x - 1).get('Ys') as FormArray;
    this.formErrors.Xs[x - 1].Ys = [];
    let y = 1;
    while (y <= YsA.length) {
      this.formErrors.Xs[x - 1].Ys.push({
        Y1: '',
        Y2: ''
      });
      let Y = <FormGroup>YsA.at(y - 1);
      for (let field in Y.controls) {
        let input = Y.get(field);
        if (input.invalid && input.dirty) {
          for (let error in input.errors) {
            this.formErrors.Xs[x - 1].Ys[y - 1][field] = this.validationMessages.Xs.Ys[field][error];

          }

        }
      }
      y++;
    }
  }
}

