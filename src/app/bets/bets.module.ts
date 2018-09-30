import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {BetsOverviewComponent} from './bets-overview/bets-overview.component';
import {BetsComponent} from './bets.component';
import {NewBetDialogComponent} from './new-bet-dialog/new-bet-dialog.component';

@NgModule({
  imports: [
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
