import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {BetsComponent} from './bets.component';
import {NewBetDialogComponent} from './new-bet-dialog/new-bet-dialog.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BetsOverviewComponent} from './bets-table/bets-table.component';
import {FlexModule} from '@angular/flex-layout';
import {MultibetTableComponent} from './multibet-table/multibet-table.component';
import { NewGoalDialogComponent } from './new-goal-dialog/new-goal-dialog.component';
import { NewDayDialogComponent } from './new-day-dialog/new-day-dialog.component';
import { InventoryPageComponent } from './inventory-page/inventory-page.component';
import { DayTableComponent } from './day-table/day-table.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FlexModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    OwlDateTimeModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    BetsOverviewComponent,
    BetsComponent,
    DayTableComponent,
    NewBetDialogComponent,
    MultibetTableComponent,
    NewGoalDialogComponent,
    NewDayDialogComponent,
    InventoryPageComponent
  ]
})
export class BetsModule { }
