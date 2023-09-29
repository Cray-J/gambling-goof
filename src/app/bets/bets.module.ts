import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { BetsComponent } from './bets.component';
import { BetsOverviewComponent } from './bets-table/bets-table.component';
import { FlexModule } from '@angular/flex-layout';
import { DayTableComponent } from './day-table/day-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NewBetSlipDialogComponent } from "./new-betSlip-dialog/new-betSlip-dialog.component";

@NgModule({
  imports: [
    CoreModule,
    FlexModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  declarations: [
    BetsOverviewComponent,
    BetsComponent,
    DayTableComponent,
    NewBetSlipDialogComponent
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class BetsModule {}
