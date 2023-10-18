import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import moment from "moment/moment";
import { BetCategory } from "../shared/model/bet-category.model";
import { Outcome } from "../shared/model/outcome.enum";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BetSlip } from "../shared/model/betslip.model";
import { TestBed } from "@angular/core/testing";

describe('CalculationsTest', () => {
  // TestBed.configureTestingModule({
  //   providers: [FormBuilder],
  //   imports: imports ? [imports] : []
  // });
  //
  //
  // it('Test all', () => {
  //   const betForm = this._formBuilder.group({
  //     date: new FormControl<Date>(moment().toDate()),
  //     stake: new FormControl(data?.stake ?? '100', [Validators.required, Validators.pattern('[0-9]{3}')]),
  //     bookie: new FormControl(data?.bookie ?? '', Validators.required),
  //     category: new FormControl<BetCategory>(BetCategory.daily),
  //     odds: new FormControl<number>({ value: data?.odds ?? 1, disabled: true }),
  //     balanceChange: new FormControl<number>({ value: data?.balanceChange ?? 0, disabled: true }),
  //     outcome: new FormControl<Outcome>({ value: data?.outcome ?? Outcome.awaiting, disabled: true }),
  //     selections: this._formBuilder.array<FormGroup>(data?.selections  ? this.buildFormArray() : [])
  //   });
  // });
});
