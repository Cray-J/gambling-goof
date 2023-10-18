import { Component, Inject, OnInit } from "@angular/core";
import { $enum } from "ts-enum-util";
import { Bookie } from "../../shared/model/bookie.enum";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Outcome } from "../../shared/model/outcome.enum";
import { BetCategory } from "../../shared/model/bet-category.model";
import { BetSlip, PartBet } from "../../shared/model/betslip.model";
import { FirebaseService } from "../../firebase.service";
import moment from "moment";
import { ToText } from "../../shared/model/to-text";
import outcome = ToText.outcome;
import { calculateOutcome } from "../../core/calculations";

@Component({
  selector: 'app-new-betSlip-dialog',
  templateUrl: './new-betSlip-dialog.component.html',
  styleUrls: ['./new-betSlip-dialog.component.scss']
})
export class NewBetSlipDialogComponent implements OnInit {
  public bookies = $enum(Bookie).getKeys();
  public betCategory = $enum(BetCategory).getKeys();
  public outcomes = $enum(Outcome).getKeys();

  betForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewBetSlipDialogComponent>,
              public firebaseService: FirebaseService,
              @Inject(MAT_DIALOG_DATA) public data: BetSlip,
              private _formBuilder: FormBuilder) {
    console.log('in dialog: ', data, data?.bookie);
    this.betForm = this._formBuilder.group({
      date: new FormControl<Date>(moment().toDate()),
      stake: new FormControl(data?.stake ?? '100', [Validators.required, Validators.pattern('[0-9]{3}')]),
      bookie: new FormControl(data?.bookie ?? '', Validators.required),
      category: new FormControl<BetCategory>(BetCategory.daily),
      odds: new FormControl<number>({ value: data?.odds ?? 1, disabled: true }),
      balanceChange: new FormControl<number>({ value: data?.balanceChange ?? 0, disabled: true }),
      outcome: new FormControl<Outcome>({ value: data?.outcome ?? Outcome.awaiting, disabled: true }),
      selections: this._formBuilder.array<FormGroup>(data?.selections  ? this.buildFormArray() : [])
    });
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
      id: this.data?.id,
      stake: this.betForm.controls['stake'].value
    };
    console.log('VALUE', this.betForm.controls['balanceChange'].value)
    // console.log('SAVING: ', moment(this.betForm.controls['date'].value).format("DD/MM/YYYY"));
    // console.log(this.betForm.controls['date'].value.toISOString());
    // console.log(moment(betSlip.date).format("DD/MM/YYYY"))
    // console.log(this.betForm);
    this.dialogRef.close(betSlip);
  }

  buildFormArray() {
    return this.data.selections.map(selection => {
      return this.createSelection(selection);
    })
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

  createSelection(selection?: PartBet): FormGroup {
    return this._formBuilder.group({
      match: [selection?.match ?? '', [Validators.required]],
      selection: [selection?.selection ?? '', [Validators.required]],
      odds: [selection?.odds ?? '', [Validators.required]],
      outcome: [selection?.outcome ?? Outcome.awaiting, [Validators.required]]
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

  public updateBalance() {
    let newValue: number = 0;
    const stake = this.betForm.controls['stake'].value;
    const odds = this.betForm.controls['odds'].value;
    switch (this.betForm.controls['outcome'].value) {
      case Outcome.win:
      case Outcome.halfWin:
        newValue = this.calculateValue();
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

  private calculateValue() {
    let result;
    // @ts-ignore
    const totalOdds = this.getSelections().controls.reduce((result, current) => {
      console.log('CURR', current);
      // result = current.value;
      // console.log((current as FormGroup).controls['outcome'].value, (current as FormGroup).controls['odds'].value)
      if ((current as FormGroup).controls['outcome'].value === Outcome.win) {
        result *= (current as FormGroup).controls['odds'].value;
      } else if ((current as FormGroup).controls['outcome'].value === Outcome.halfWin) {
        result *= ((current as FormGroup).controls['odds'].value -1) / 2 + 1 ;
      }
      console.log(result)
      return result;
      // this.betForm.controls['selections'].value
    }, 1);
    console.log('TOTAL ODDS', totalOdds);
    return this.betForm.controls['stake'].value * totalOdds - this.betForm.controls['stake'].value;
  }

  public updateOutcome() {
    setTimeout(() => {
      const newOutcome = calculateOutcome(this.getSelections());
      console.log('OUTCOME: ', newOutcome)
      this.betForm.controls['outcome'].setValue(newOutcome);
      this.updateBalance();
    }, 0)

  }

  private getSelections(): FormArray {
    return (this.betForm.controls['selections'] as FormArray);
  }
}
