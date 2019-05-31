import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { BetsComponent } from './bets.component';
import { NewBetDialogComponent } from './new-bet-dialog/new-bet-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BetsOverviewComponent } from './bets-table/bets-table.component';
import { MatCardModule, MatDialogActions, MatDialogModule } from "@angular/material";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
    SharedModule,
    FlexModule,
    MatDialogModule,
    CoreModule,
    MatCardModule
  ],
  declarations: [
    BetsOverviewComponent,
    BetsComponent,
    NewBetDialogComponent
  ]
})
export class BetsModule { }
