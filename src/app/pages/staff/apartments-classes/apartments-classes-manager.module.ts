import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {ReactiveFormsModule} from '@angular/forms';
import {ApartmentsClassesManagerComponent} from './apartments-classes-manager.component';
import {ApartmentsClassesTableComponent} from './components/apartments-classes-table/apartments-classes-table.component';
import {ChangeApartmentsClassesDialogComponent} from './components/change-apartment-class-dialog/change-apartments-classes-dialog.component';
import {AddApartmentsClassesDialogComponent} from './components/add-apartment-class-dialog/add-apartments-classes-dialog.component';
import {DeleteApartmentsClassesDialogComponent} from './components/delete-apartment-class-dialog/delete-apartments-classes-dialog.component';
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
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
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
    ApartmentsClassesManagerComponent,
    ApartmentsClassesTableComponent,
    ChangeApartmentsClassesDialogComponent,
    AddApartmentsClassesDialogComponent,
    DeleteApartmentsClassesDialogComponent
  ],
  providers: [HttpService],
  entryComponents: [
    ChangeApartmentsClassesDialogComponent,
    AddApartmentsClassesDialogComponent,
    DeleteApartmentsClassesDialogComponent
  ],
})
export class ApartmentsClassesManagerModule {
}
