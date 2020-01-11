import { Component, Inject, } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { split } from "ts-node";
import { Bet } from "../../shared/model/bet.model";
import { BetService } from "../../core/bet.service";

@Component({
  selector: 'app-new-day-dialog',
  templateUrl: './new-day-dialog.component.html',
  styleUrls: ['./new-day-dialog.component.scss']
})
export class NewDayDialogComponent {

  date = new FormControl(new Date());
  myForm: FormGroup;
  arr: FormArray;

  constructor(public dialogRef: MatDialogRef<NewDayDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private betsService: BetService,
              private fb: FormBuilder) {
    this.createFormGroup();
  }

  createFormGroup() {
   /* return new FormGroup({
      month: new FormControl(),
      income: new FormControl(),
      totalBets: new FormControl(),
      roi: new FormControl()
    });*/
    this.myForm = this.fb.group({
      date: this.fb.control(new Date()),
      arr: this.fb.array([this.createItem()])
    });
    //this.myForm.get('date').setValue(Date.now());
    console.log(this.myForm);
  }

  createItem() {
    const group = this.fb.group({
      time: [''],
      home: [''],
      away: [''],
      bookie: [''],
      selection: [''],
      odds: [''],
      stake: ['']
    });
    group.patchValue({
      stake: 100
    });
    return group;
  }

  getDateField() {
    return this.myForm.get('date');
  }

  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  onSubmit() {
    console.log(this.myForm.value);
    const time: Date = this.myForm.value['date'];
    const bets = this.myForm.value['arr'];
    const newBets: Bet[] = [];
    console.log('bets: ', bets);
    bets.forEach(val => {
      if (val.home !== '') {
        let bet = {};
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

        this.betsService.addBet(bet);
      }
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNew(i) {
    console.log(i);
    const arr = this.myForm.get('arr') as FormArray;
    console.log(i, arr.length);
    if (i === arr.length - 1) {
      this.addItem();
    }
  }

  removeBet(index: number) {
    const arr = this.myForm.get('arr') as FormArray;
    arr.removeAt(index);
  }
}

