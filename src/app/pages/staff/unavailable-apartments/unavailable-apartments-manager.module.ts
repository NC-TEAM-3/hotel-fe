/* tslint:disable:max-line-length */
import {BrowserModule} from '@angular/platform-browser';
import {EventEmitter, NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {UnavailableApartmentsManagerComponent} from './unavailable-apartments-manager.component';
import {UnavailableApartmentsTableComponent} from './components/unavailable-apartments-table/unavailable-apartments-table.component';
import {DeleteUnavailableApartmentDialogComponent} from './components/delete-unavailable-apartment-dialog/delete-unavailable-apartment-dialog.component';
import {ChangeUnavailableApartmentDialogComponent} from './components/change-unavailable-apartment-dialog/change-unavailable-apartment-dialog.component';
import {AddUnavailableApartmentDialogComponent} from './components/add-unavailable-apartment-dialog/add-unavailable-apartment-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  MatNativeDateModule,
  NativeDateAdapter
} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../utils/AppDateAdapter';
import {AnimationsModule} from "../../../modules/animations/animations.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  imports: [
    MatPaginatorModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDatepickerModule,
    AnimationsModule,
    MatSnackBarModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: [
    UnavailableApartmentsManagerComponent,
    UnavailableApartmentsTableComponent,
    AddUnavailableApartmentDialogComponent,
    DeleteUnavailableApartmentDialogComponent,
    ChangeUnavailableApartmentDialogComponent
  ],
  providers: [HttpService, EventEmitter,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}],
  entryComponents: [
    DeleteUnavailableApartmentDialogComponent,
    ChangeUnavailableApartmentDialogComponent,
   AddUnavailableApartmentDialogComponent
  ],
})
export class UnavailableApartmentsManagerModule {
}
