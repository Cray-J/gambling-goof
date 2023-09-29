import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BetSlip } from "./shared/model/betslip.model";
import { cloneDeep } from "lodash";
import { Outcome } from "./shared/model/outcome.enum";
import { take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFirestore) { }

  getAllUsers() {
    return new Promise<any>((resolve)=> {
      this.db.collection('Bets').get().subscribe(v => console.log('bets first', v));
      this.db.collection('Bets').valueChanges({ idField: 'id' }).pipe((take(1))).subscribe(users => {
        console.log('2', users)
        const us = resolve(users);
        console.log(us);
        this.updateBet(users[0] as BetSlip)
        return us;
      });
    })
  }

  addNewBet(betslip: BetSlip) {
    this.db.collection("Bets").doc().set(betslip);
  }

  updateBet(betslip: BetSlip) {
    const betRaw = cloneDeep(betslip);
    betRaw.locked = true;
    betRaw.balanceChange = 0;
    betRaw.outcome = Outcome.loss;
    delete betRaw.id;
    // const newBet = delete betslip.id;
    // const newBet2 = Omit<ConstructionNodeDto, 'name'> & {
    //   title: string;
    // }
    // console.log(betslip, newBet);
    this.db.collection("Bets").doc(`${betslip.id}`).set(betRaw)
  }
}
