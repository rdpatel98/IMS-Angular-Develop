import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularDualListBoxModule } from "angular-dual-listbox";
import { HasPermissionDirective } from '../directives/haspermission.directive';



@NgModule({
  declarations: [
    HasPermissionDirective
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    AngularDualListBoxModule
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HasPermissionDirective,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    AngularDualListBoxModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
