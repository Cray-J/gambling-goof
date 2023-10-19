import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { BetsComponent } from './bets.component';
import { BetsOverviewComponent } from './bets-table/bets-table.component';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NewBetSlipDialogComponent } from "./new-betSlip-dialog/new-betSlip-dialog.component";
import { NewBetsTableComponent } from "./new-bets-table/new-bets-table.component";
import { DatePipe } from "@angular/common";
import { BtnCellRendererComponent } from "./new-bets-table/BtnCellRendererComponent.component";
import { AppModule } from "../app.module";
import { StatsPanelComponent } from "./stats-panel/stats-panel.component";
import { IconCellRendererComponent } from "./new-bets-table/IconCellRenderer.component";

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
    BtnCellRendererComponent,
    BetsOverviewComponent,
    IconCellRendererComponent,
    NewBetsTableComponent,
    BetsComponent,
    NewBetSlipDialogComponent,
    StatsPanelComponent
  ],
  providers: [
    MatDatepickerModule,
    DatePipe
  ]
})
export class BetsModule {}
