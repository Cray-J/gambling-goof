import { Component, OnInit } from "@angular/core";
import { $enum } from "ts-enum-util";
import { Bookie } from "../../shared/model/bookie.enum";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Outcome } from "../../shared/model/outcome.enum";
import { BetCategory } from "../../shared/model/bet-category.model";
import { BetSlip, PartBet } from "../../shared/model/betslip.model";
import { FirebaseService } from "../../firebase.service";
import moment from "moment";
import { ToText } from "../../shared/model/to-text";
import outcome = ToText.outcome;

@Component({
  selector: 'app-new-betSlip-dialog',
  templateUrl: './new-betSlip-dialog.component.html',
  styleUrls: ['./new-betSlip-dialog.component.scss']
})
export class NewBetSlipDialogComponent implements OnInit {
  public bookies = $enum(Bookie).getKeys();
  public betCategory = $enum(BetCategory).getKeys();
  public outcomes = $enum(Outcome).getKeys();

  betForm: FormGroup = this._formBuilder.group({
    date: new FormControl<Date>(moment().toDate()),
    stake: ['100', [Validators.required, Validators.pattern('[0-9]{3}')]],
    bookie: ['', Validators.required],
    category: new FormControl<BetCategory>(BetCategory.daily),
    odds: new FormControl<number>({ value: 1, disabled: true }),
    balanceChange: new FormControl<number>({ value: 0, disabled: true }),
    outcome: new FormControl<Outcome>({ value: Outcome.awaiting, disabled: true }),
    selections: this._formBuilder.array<FormGroup>([])
  });

  constructor(public dialogRef: MatDialogRef<NewBetSlipDialogComponent>,
              public firebaseService: FirebaseService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    const betSlip: BetSlip = {
      bookie: this.betForm.controls['bookie'].value,
      balanceChange: this.betForm.controls['balanceChange'].value,
      date: this.betForm.controls['date'].value.toISOString(),
      odds: this.betForm.controls['odds'].value,
      outcome: this.betForm.controls['outcome'].value,
      selections: [
        ...this.buildSelections()
      ],
      stake: this.betForm.controls['stake'].value
    };
    console.log('SAVING: ', moment(this.betForm.controls['date'].value).format("DD/MM/YYYY"));
    console.log(this.betForm.controls['date'].value.toISOString());
    console.log(moment(betSlip.date).format("DD/MM/YYYY"))
    this.firebaseService.addNewBet(betSlip);
    console.log(this.betForm);
    // this.dialogRef.close();
  }

  buildSelections(): PartBet[] {
    return (this.betForm.controls['selections'] as FormArray).controls.map((formgroup: FormGroup) => {
      console.log('TT', formgroup)
      return  {
        match: formgroup.controls['match'].value,
        odds: formgroup.controls['odds'].value,
        outcome: formgroup.controls['outcome'].value,
        selection: formgroup.controls['selection'].value
      }
    })
  }

  addSelection() {
    (this.betForm.controls['selections'] as FormArray).push(this.createSelection());
    console.log(this.betForm);
  }

  removeSelection(index: number) {
    (this.betForm.controls['selections'] as FormArray).removeAt(index);
  }

  createSelection(): FormGroup {
    return this._formBuilder.group({
      match: ['', [Validators.required]],
      selection: ['', [Validators.required]],
      odds: ['', [Validators.required]],
      outcome: [Outcome.awaiting, [Validators.required]]
    })
  }

  public isEvenNumber(index: number): boolean {
    return index % 2 === 0;
  }

  public recalculateOdds() {
    const odds = this.betForm.value['selections'].reduce((odds, current) => {
      console.log(odds, current)
      return odds * current.odds
    }, 1);
    console.log(odds);
    this.betForm.controls['odds'].setValue(odds);
  }

  public calculateOutcome() {
    setTimeout(() => {
      console.log('INSIDE')
      console.log(this.getSelections());
      let isLoss = false;
      let isWin = true;
      let hasAwaiting = false;
      let givenOdds = this.betForm.controls['odds'].value;
      this.getSelections().controls.forEach((group: FormGroup) => {
        console.log(group.controls['outcome'].value);
        isWin = isWin && group.controls['outcome'].value === Outcome.win;
        isLoss = isLoss || group.controls['outcome'].value === Outcome.loss;
        hasAwaiting = hasAwaiting || group.controls['outcome'].value === Outcome.awaiting;
      });
      let newOutcome: Outcome;
      if (hasAwaiting) {
        newOutcome = Outcome.awaiting;
      } else if (isLoss) {
        newOutcome = Outcome.loss;
      } else if (isWin) {
        newOutcome = Outcome.win;
      }
      console.log(isLoss, isWin, newOutcome);
      this.betForm.controls['outcome'].setValue(newOutcome);
      this.updateBalance();
      // const isLoss = this.getSelections().some(value => value.outcome === Outcome.loss);
      // const isWin = this.buildSelections().every(value => value.outcome === Outcome.win);
      // console.log(isLoss, isWin);
    }, 0);
  }

  public updateBalance() {
    let newValue: number = 0;
    const stake = this.betForm.controls['stake'].value;
    const odds = this.betForm.controls['odds'].value;
    switch (this.betForm.controls['outcome'].value) {
      case Outcome.win:
        newValue = odds * stake - stake;
        break;
      case Outcome.halfWin:
        newValue = (odds * stake - stake) / 2;
        break;
      case Outcome.halfLoss:
        newValue -= stake / 2;
        break;
      case Outcome.loss:
        newValue = -stake;
        break;
      case Outcome._void:
      case Outcome.push:
      case Outcome.awaiting:
        newValue = 0;
    }
    console.log(newValue);
      this.betForm.controls['balanceChange'].setValue(newValue);
  }

  private getSelections(): FormArray {
    return (this.betForm.controls['selections'] as FormArray);
  }

}
