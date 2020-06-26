import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { BetsComponent } from './bets.component';
import { NewBetDialogComponent } from './new-bet-dialog/new-bet-dialog.component';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { BetsOverviewComponent } from './bets-table/bets-table.component';
import { FlexModule } from '@angular/flex-layout';
import { MultibetTableComponent } from './multibet-table/multibet-table.component';
import { NewGoalDialogComponent } from './new-goal-dialog/new-goal-dialog.component';
import { NewDayDialogComponent } from './new-day-dialog/new-day-dialog.component';
import { InventoryPageComponent } from './inventory-page/inventory-page.component';
import { DayTableComponent } from './day-table/day-table.component';
import { NewSeasonBetDialogComponent } from './new-season-bet-dialog/new-season-bet-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FlexModule,
    OwlDateTimeModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    BetsOverviewComponent,
    BetsComponent,
    DayTableComponent,
    NewBetDialogComponent,
    NewSeasonBetDialogComponent,
    MultibetTableComponent,
    NewGoalDialogComponent,
    NewDayDialogComponent,
    InventoryPageComponent
  ]
})
export class BetsModule {}
