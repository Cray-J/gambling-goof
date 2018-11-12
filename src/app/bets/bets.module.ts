import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { BetsComponent } from './bets.component';
import { NewBetDialogComponent } from './new-bet-dialog/new-bet-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BetsOverviewComponent } from './bets-table/bets-table.component';

@NgModule({
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
    SharedModule,
    CoreModule,
  ],
  declarations: [
    BetsOverviewComponent,
    BetsComponent,
    NewBetDialogComponent
  ]
})
export class BetsModule { }
