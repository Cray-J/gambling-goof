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
      matches: this.fb.array([])
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
      matches: [],
      date: time,
      summary: '',
      result: 0,
      verfied: false
    };
    console.log('ID: ', newDay.id);

    const matches = this.myForm.value['matches'];
    matches.forEach(match => {

    });

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
      existing.matches.push(...newDay.matches);
      this.dayService.save(existing);
    } else {
      console.log('new day');
      this.dayService.save(newDay);
    }

    this.dialogRef.close();
  }

  public addNewMatch() {
    const control = <FormArray>this.myForm.controls.matches;
    control.push(
      this.fb.group({
        time: [''],
        home: [''],
        away: [''],
        bets: this.fb.array([])
      })
    );
  }

  public deleteMatch(index: number) {
    const control = <FormArray>this.myForm.controls.matches;
    control.removeAt(index);
  }

  public setMatches() {
    const control = <FormArray>this.myForm.controls.matches;
    this.data.matches.forEach(x => {
      control.push(this.fb.group({
        matches: x.matches
      }));
    });
  }

  public setBets(x) {
    const arr = new FormArray([]);
    x.bets.forEach(y => {
      arr.push(this.fb.group({
        selection: y.selection
      }));
    });
  }

  public addNewBet(control) {
    const group = this.fb.group({
        bookie: [''],
        selection: [''],
        odds: [''],
        stake: ['']
      });
    group.patchValue({
      stake: 100
    });
    control.push(group);
   /* this
      .filteredOptions
      .push(group.get('bookie').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      ));*/
  }

  public deleteProject(control, index) {
    control.removeAt(index);
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

