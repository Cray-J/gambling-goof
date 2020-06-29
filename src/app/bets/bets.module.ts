import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { BetsComponent } from './bets.component';
import { NewBetDialogComponent } from './new-bet-dialog/new-bet-dialog.component';
import { BetsOverviewComponent } from './bets-table/bets-table.component';
import { FlexModule } from '@angular/flex-layout';
import { NewGoalDialogComponent } from './new-goal-dialog/new-goal-dialog.component';
import { NewDayDialogComponent } from './new-day-dialog/new-day-dialog.component';
import { DayTableComponent } from './day-table/day-table.component';
import { NewSeasonBetDialogComponent } from './new-season-bet-dialog/new-season-bet-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CoreModule,
    FlexModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    BetsOverviewComponent,
    BetsComponent,
    DayTableComponent,
    NewBetDialogComponent,
    NewSeasonBetDialogComponent,
    NewGoalDialogComponent,
    NewDayDialogComponent
  ]
})
export class BetsModule {}
