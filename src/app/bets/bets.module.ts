import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { BetsComponent } from './bets.component';
import { NewBetDialogComponent } from './new-bet-dialog/new-bet-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BetsOverviewComponent } from './bets-table/bets-table.component';
import { MatButtonModule, MatCardModule, MatDialogActions, MatDialogModule } from "@angular/material";
import {FlexModule} from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { MultibetTableComponent } from './multibet-table/multibet-table.component';

@NgModule({
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
    SharedModule,
    FlexModule,
    MatDialogModule,
    CoreModule,
    MaterialModule
  ],
  declarations: [
    BetsOverviewComponent,
    BetsComponent,
    NewBetDialogComponent,
    MultibetTableComponent
  ]
})
export class BetsModule { }
