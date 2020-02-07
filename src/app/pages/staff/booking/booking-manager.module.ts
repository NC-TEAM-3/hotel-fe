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
import {BookingManagerComponent} from './booking-manager.component';
import {BookingTableComponent} from './components/booking-table/booking-table.component';
import {DeleteBookingDialogComponent} from './components/delete-booking-dialog/delete-booking-dialog.component';
import {ChangeBookingDialogComponent} from './components/change-booking-dialog/change-booking-dialog.component';
import {AddBookingDialogComponent} from './components/add-booking-dialog/add-booking-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  MatNativeDateModule,
  NativeDateAdapter
} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {APP_DATE_FORMATS, AppDateAdapter} from "../../../utils/AppDateAdapter";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AnimationsModule} from "../../../modules/animations/animations.module";

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
    MatNativeDateModule,
    MatSnackBarModule,
    AnimationsModule
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
    BookingManagerComponent,
    BookingTableComponent,
    DeleteBookingDialogComponent,
    ChangeBookingDialogComponent,
    AddBookingDialogComponent
  ],
  providers: [HttpService, EventEmitter,
    DatePipe,
    MatDatepickerModule,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}],
  entryComponents: [
    DeleteBookingDialogComponent,
    ChangeBookingDialogComponent,
    AddBookingDialogComponent
  ],
})
export class BookingManagerModule {
}
