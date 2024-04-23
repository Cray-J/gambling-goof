import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from "rxjs";
import { ButtonModule } from 'primeng/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BetDialogComponent } from '../bet-dialog/bet-dialog.component';
import { BetSlip } from '../../shared/model/betslip.model';
import { FirebaseService } from '../../core/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    ButtonModule,
    MatToolbarModule
  ],
  standalone: true
})
export class HeaderComponent {
  private readonly dialog = inject(MatDialog);
  private readonly firebaseService = inject(FirebaseService);

  openBetSlipDialog(): void {
    this.dialog
      .open(BetDialogComponent, {
        width: 'calc(60vw)',
        height: '1200px',
        panelClass: 'new-betSlip-dialog'
      })
      .afterClosed()
      .pipe(take(1), filter(v => !!v))
      .subscribe((result: BetSlip) => {
        console.log('The dialog was closed', result, !!result);
        delete result.id;
        this.firebaseService.addNewBet(result);
      });
  }
}
