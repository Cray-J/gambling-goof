import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
  imports: [CommonModule],
  declarations: [],
  exports: [materialModules]
})
export class SharedModule {}
