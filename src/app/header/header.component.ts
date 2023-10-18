import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bet } from '../shared/model/bet.model';
import { NewBetSlipDialogComponent } from "../bets/new-betSlip-dialog/new-betSlip-dialog.component";
import { BetSlip } from "../shared/model/betslip.model";
import { FirebaseService } from "../firebase.service";
import { filter, take } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  bet: Bet;

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService
  ) {}

  openBetslipDialog(): void {
    this.dialog
      .open(NewBetSlipDialogComponent, {
        width: 'calc(80vw)',
        height: '1200px',
        panelClass: 'new-betSlip-dialog'
      })
      .afterClosed()
      .pipe(take(1), filter(v => !!v))
      .subscribe((result: BetSlip) => {
        console.log('The dialog was closed', result, !!result);
        delete result.id;
        this.firebaseService.addNewBet(result);
        console.log(this.bet);
      });
  }
}
