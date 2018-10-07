import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {BetsOverviewComponent} from './bets-overview/bets-overview.component';
import {BetsComponent} from './bets.component';
import {NewBetDialogComponent} from './new-bet-dialog/new-bet-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

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
