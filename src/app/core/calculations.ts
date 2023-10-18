import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
import { Outcome } from "../shared/model/outcome.enum";
import { PartBet } from "../shared/model/betslip.model";

export function calculateOutcome(formArray: FormArray): Outcome {
  // setTimeout(() => {
    console.log('INSIDE', formArray, formArray.controls['outcome'])
    // console.log(this.getSelections());
    // let isLoss = false;
    // let isWin = true;
    // let hasAwaiting = false;
    const hasFailedOutcome = formArray.controls.some((v: FormGroup) => v.controls['outcome'].value === Outcome.loss);
    console.log(hasFailedOutcome)
    if (hasFailedOutcome) {
      return Outcome.loss;
    } else if (formArray.controls.some((v: FormGroup) => v.controls['outcome'].value === Outcome.awaiting)) {
      console.log('RETURNING ', formArray.controls);
      return Outcome.awaiting;
    } else if (formArray.controls.every((v: FormGroup) => Outcome.push === v.controls['outcome'].value)) {
      return Outcome.push;
    } else if (formArray.controls.every((v: FormGroup) => Outcome._void === v.controls['outcome'].value)) {
      return Outcome._void;
    } else if (formArray.controls.every((v: FormGroup) => [Outcome.win, Outcome.halfWin, Outcome.push, Outcome._void].includes(v.controls['outcome'].value))) {
      return Outcome.win;
    }
    console.log('DEFAULTING')
  return Outcome.awaiting;
  // const partBetsWithValidOutcomes = group.filter(v => ![Outcome.push, Outcome._void].includes(v.controls['outcome'].value));
  // console.log(partBetsWithValidOutcomes);
  //
  //   // let givenOdds = this.betForm.controls['odds'].value;
  //
  //   group.forEach((group: FormGroup) => {
  //     console.log(group.controls['outcome'].value);
  //     isWin = isWin && group.controls['outcome'].value === Outcome.win;
  //     isLoss = isLoss || group.controls['outcome'].value === Outcome.loss;
  //     hasAwaiting = hasAwaiting || group.controls['outcome'].value === Outcome.awaiting;
  //   });
  //   let newOutcome: Outcome;
  //   if (hasAwaiting) {
  //     newOutcome = Outcome.awaiting;
  //   } else if (isLoss) {
  //     newOutcome = Outcome.loss;
  //   } else if (isWin) {
  //     newOutcome = Outcome.win;
  //   }
  //   console.log(isLoss, isWin, newOutcome);
  //   this.betForm.controls['outcome'].setValue(newOutcome);
  //   this.updateBalance();
    // const isLoss = this.getSelections().some(value => value.outcome === Outcome.loss);
    // const isWin = this.buildSelections().every(value => value.outcome === Outcome.win);
    // console.log(isLoss, isWin);
  // }, 0);
}




