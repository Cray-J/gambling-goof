import { Component, OnInit } from '@angular/core';
import { DayService } from './core/day.service';
// Import the functions you need from the SDKs you need
import { FirebaseService } from "./firebase.service";
import { Bookie } from "./shared/model/bookie.enum";
import { Outcome } from "./shared/model/outcome.enum";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public firebaseService: FirebaseService
  ) {
    // firebaseService.getAllUsers();
    // firebaseService.addNewBet({
    //   date: Date.now(),
    //   stake: 1,
    //   valueReturn: 0,
    //   locked: false,
    //   bookie: Bookie.betfair,
    //   odds: 1.90,
    //   outcome: Outcome.awaiting,
    //   selections: [{
    //     match: 'LASK v Liverpool',
    //     odds: 1.9,
    //     selection: 'Over 4 goals',
    //     outcome: Outcome.awaiting
    //   }]
    // })
    // const firebaseConfig = {
//       apiKey: "AIzaSyBh6LcLLwKN1q60uk7PMZ2vnWF0o6vQ6BU",
//       authDomain: "gambling-goof.firebaseapp.com",
//       databaseURL: "https://gambling-goof.firebaseio.com",
//       projectId: "gambling-goof",
//       storageBucket: "gambling-goof.appspot.com",
//       messagingSenderId: "762455269995",
//       appId: "1:762455269995:web:e5631357aa84a703aec72e"
//     };
//
// // Initialize Firebase
//     const app = initializeApp(firebaseConfig);
//     // const app = initializeApp(environment.firebase);
  }

  ngOnInit() {
    // this.daysService.getDays();
  }
}
