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

@Component({
  selector: 'new-day-dialog',
  templateUrl: './new-day-dialog.component.html',
  styleUrls: ['./new-day-dialog.component.scss']
})
export class NewDayDialogComponent implements OnInit {

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
    this.createFormGroup();
  }

  public ngOnInit(): void {
    console.log('dialog init');
    this.dayService.daysChanged.subscribe(days => {
      console.log(days);
      this.days = days;
    });
  }

  createFormGroup() {
    this.myForm = this.fb.group({
      date: this.fb.control(new Date()),
      arr: this.fb.array([])
    });
    this.addItem();
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
    this.filteredOptions.
    push(group.get('bookie').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      ));
    return group;
  }

  getDateField(): AbstractControl {
    return this.myForm.get('date');
  }

  getFormArray(): FormArray {
    return this.myForm.get('arr') as FormArray;
  }

  getFormArrayControls(): AbstractControl[] {
    return (this.myForm.get('arr') as FormArray).controls;
  }

  addItem() {
    this.getFormArray().push(this.createItem());
  }

  onSubmit() {
    console.log(this.myForm.value);
    const time: Date = this.myForm.value['date'];
    console.log(time);
    const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
    const tempMonth = 1 + time.getMonth();
    const month = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
    const year = time.getFullYear();
    const newDay: Day = {
      id: `${year}${month}${day}`,
      bets: [],
      date: time,
      summary: '',
      result: 0
    };
    console.log('ID: ', newDay.id);

    const bets = this.myForm.value['arr'];
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
        bet['id'] = '' + Date.now();
        newDay.bets.push(bet as Bet);
       // this.betsService.addBet(bet);
      }
    });
    const existing = this.days.find(d => d.id === newDay.id);

    console.log(newDay);
    if (existing) {
      console.log('found day');
      existing.bets.push(...newDay.bets);
      this.dayService.save(existing);
    } else {
      console.log('new day');
      this.dayService.save(newDay);
    }

    this.dialogRef.close();
  }

  private updateTeams(home, away) {
    [home, away].forEach(team => {
      console.log(team, this.teamsService.teams);
      if (!this.teamsService.teams.some(t => t === team)) {
        console.log('Trying to save team');
        this.teamsService.addTeam(team);
      }
    });
  }

  private _filter(value: string): string[] {
    return this.bookies.filter(option => option.toLowerCase().includes(value.toLowerCase()));
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

