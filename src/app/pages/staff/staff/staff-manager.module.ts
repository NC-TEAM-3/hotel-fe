import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {StaffManagerComponent} from './staff-manager.component';
import {ChangeStaffDialogComponent} from './components/change-staff-dialog/change-staff-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {StaffTableComponent} from './components/staff-table/staff-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AddStaffDialogComponent} from './components/add-staff-dialog/add-staff-dialog.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {AnimationsModule} from "../../../modules/animations/animations.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
  imports: [
    MatPaginatorModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatExpansionModule,
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
    StaffManagerComponent, ChangeStaffDialogComponent, AddStaffDialogComponent, StaffTableComponent
  ],
  providers: [HttpService],
  entryComponents: [ ChangeStaffDialogComponent, AddStaffDialogComponent],
})
export class StaffManagerModule {
}
