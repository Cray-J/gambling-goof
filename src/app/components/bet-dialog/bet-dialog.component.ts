import { Component, Inject } from "@angular/core";
import { $enum } from "ts-enum-util";
import { allBookies } from "../../shared/model/bookie.enum";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Outcome } from "../../shared/model/outcome.enum";
import { BetSlip, PartBet } from "../../shared/model/betslip.model";
import moment from "moment";
import { calculateOutcome } from "../../core/calculations";
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bet-dialog',
  templateUrl: './bet-dialog.component.html',
  styleUrls: ['./bet-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    ButtonModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    CommonModule,
    FlexModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  standalone: true
})
export class BetDialogComponent {
  protected bookies = allBookies;
  protected outcomes = $enum(Outcome).getKeys();
  protected betForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<BetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BetSlip,
              private _formBuilder: FormBuilder) {
    this.betForm = this._formBuilder.group({
      date: new FormControl<Date>(moment().toDate()),
      stake: new FormControl(data?.stake ?? '100', [Validators.required, Validators.pattern('[0-9]{3}')]),
      bookie: new FormControl(data?.bookie ?? '', Validators.required),
      odds: new FormControl<number>({ value: data?.odds ?? 1, disabled: true }),
      balanceChange: new FormControl<number>({ value: data?.balanceChange ?? 0, disabled: true }),
      outcome: new FormControl<Outcome>({ value: data?.outcome ?? Outcome.awaiting, disabled: true }),
      selections: this._formBuilder.array<FormGroup>(data?.selections  ? this.buildFormArray() : [])
    });
  }
  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    const betSlip: BetSlip = {
      bookie: this.getFormValue('bookie'),
      balanceChange: this.getFormValue('balanceChange'),
      date: this.getFormValue('date').toISOString(),
      odds: this.getFormValue('odds'),
      outcome: this.getFormValue('outcome'),
      selections: [
        ...this.buildSelections()
      ],
      id: this.data?.id,
      stake: this.getFormValue('stake')
    };
    this.dialogRef.close(betSlip);
  }

  buildFormArray() {
    return this.data.selections.map(selection => {
      return this.createSelection(selection);
    })
  }

  buildSelections(): PartBet[] {
    return this.selectionsControl.controls.map((formgroup: FormGroup) => {
      console.log('TT', formgroup)
      return  {
        match: formgroup.controls['match'].value,
        odds: formgroup.controls['odds'].value,
        outcome: formgroup.controls['outcome'].value,
        selection: formgroup.controls['selection'].value
      }
    })
  }

  getFormValue(formId: string) {
    return this.betForm.controls[formId].value;
  }

  get selectionsControl(): FormArray {
    return this.betForm.controls['selections'] as FormArray;
  }

  addSelection() {
    this.selectionsControl.push(this.createSelection());
  }

  removeSelection(index: number) {
    this.selectionsControl.removeAt(index);
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
      return odds * current.odds
    }, 1);
    this.betForm.controls['odds'].setValue(odds);
  }
  public updateBalance() {
    let newValue: number = 0;
    const stake = this.betForm.controls['stake'].value;
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
    this.betForm.controls['balanceChange'].setValue(newValue);
  }
  private calculateValue() {
    // @ts-ignore
    const totalOdds = this.getSelections().controls.reduce((result, current) => {
      if ((current as FormGroup).controls['outcome'].value === Outcome.win) {
        result *= (current as FormGroup).controls['odds'].value;
      } else if ((current as FormGroup).controls['outcome'].value === Outcome.halfWin) {
        result *= ((current as FormGroup).controls['odds'].value -1) / 2 + 1 ;
      }
      return result;
    }, 1);
    return this.betForm.controls['stake'].value * totalOdds - this.betForm.controls['stake'].value;
  }

  public updateOutcome() {
    setTimeout(() => {
      const newOutcome = calculateOutcome(this.selectionsControl);
      this.betForm.controls['outcome'].setValue(newOutcome);
      this.updateBalance();
    }, 0)

  }
}
