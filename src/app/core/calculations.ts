import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
import { Outcome } from "../shared/model/outcome.enum";
import { PartBet } from "../shared/model/betslip.model";

export function calculateOutcome(formArray: FormArray): Outcome {
  const hasFailedOutcome = formArray.controls.some((v: FormGroup) => v.controls['outcome'].value === Outcome.loss);
  if (hasFailedOutcome) {
    return Outcome.loss;
  } else if (formArray.controls.some((v: FormGroup) => v.controls['outcome'].value === Outcome.awaiting)) {
    return Outcome.awaiting;
  } else if (formArray.controls.every((v: FormGroup) => Outcome.push === v.controls['outcome'].value)) {
    return Outcome.push;
  } else if (formArray.controls.every((v: FormGroup) => Outcome._void === v.controls['outcome'].value)) {
    return Outcome._void;
  } else if (formArray.controls.every((v: FormGroup) => [Outcome.win, Outcome.halfWin, Outcome.push, Outcome._void].includes(v.controls['outcome'].value))) {
    return Outcome.win;
  }
  return Outcome.awaiting;
}




