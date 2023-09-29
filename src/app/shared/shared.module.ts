import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from "@angular/material/divider";
import { AgGridModule } from "ag-grid-angular";

const materialModules = [
  MatAutocompleteModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  FormsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatSidenavModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MatToolbarModule,
  MatMomentDateModule,
  MatNativeDateModule,
  MatProgressBarModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules,
    AgGridModule
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    ...materialModules,
    AgGridModule
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    },
  ]
})
export class SharedModule {}
