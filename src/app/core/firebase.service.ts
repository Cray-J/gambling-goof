import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from "@angular/fire/compat/firestore";
import { cloneDeep } from "lodash";
import { BehaviorSubject, of, take } from "rxjs";
import { BetSlip } from '../shared/model/betslip.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  allValues: BehaviorSubject<BetSlip[]> = new BehaviorSubject<BetSlip[]>([]);
  allValues$ = of(this.allValues);
  constructor(private db: AngularFirestore) {
    // this.db.collection('Bets').get().subscribe((docs: QuerySnapshot<BetSlip>) => {
    //   console.log('bets first', docs)
    //   const data: BetSlip[] = [];
    //   docs.forEach(doc => {
    //     // console.log(doc.id, doc.data())
    //     const currentBet: BetSlip =  doc.data() as BetSlip;
    //     currentBet.id = doc.id;
    //     // console.log('TEST', currentBet)
    //     data.push(currentBet);
    //     // data.push()
    //   });
    //   console.log('--FETCHED DATA: ', data);
    //   this.allValues.next(data);
    //   // this.allValues = v.docs as unknown as BetSlip[];
    // });
    // this.db.collection('Bets').valueChanges().subscribe((users: BetSlip[]) => {
    this.db.collection('Bets').snapshotChanges().subscribe((users) => {
      // console.log('2', users)
      const data: BetSlip[] = [];
      users.forEach(doc => {
        // console.log(doc.id, doc.data())
        const currentBet: BetSlip =  doc.payload.doc.data() as BetSlip;
        currentBet.id = doc.payload.doc.id;
        // console.log('TEST', currentBet)
        data.push(currentBet);
        // console.log(doc.payload.doc.data())
      })
      console.log('--GOT NEW DATA: ', data)
      this.allValues.next(data);
      // this.allValues.next(users as unknown as BetSlip[]);
      // this.allValues = users;
      // const us = resolve(users);
      // console.log(us);
      // this.updateBet(users[0] as BetSlip)
      // return us;
    });
  }

  addNewBet(betslip: BetSlip) {
    console.log('--ADDING NEW BET', betslip);
    this.db.collection("Bets").doc().set(betslip).then(v => {
      console.log(v);
    });
  }

  updateBet(betslip: BetSlip) {
    console.log('--UPDATE BET:', betslip)
    let betRaw = cloneDeep(betslip);
    delete betRaw.id;
    console.log('Trying to save', betRaw, ' with id: ', betslip.id);
    this.db.collection("Bets").doc(`${betslip.id}`).set(betRaw)
  }
}
