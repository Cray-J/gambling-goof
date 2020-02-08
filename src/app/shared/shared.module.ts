import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';

const materialModules = [
  MatAutocompleteModule,
  MatDialogModule,
  MatSortModule,
  MatTableModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatInputModule,
  FormsModule,
  MatTabsModule,
  MatDatepickerModule,
  MatSidenavModule
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [materialModules]
})
export class SharedModule { }
