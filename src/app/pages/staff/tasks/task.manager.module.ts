import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {TaskManagerComponent} from './task.manager.component';
import {AddTaskDialogComponent} from './add-task-dialog/add-task-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ChangeTaskDialogComponent} from './change-task-dialog/change-task-dialog.component';
import {TaskTableComponent} from "./task-table/taks-table.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {TextMaskModule} from "angular2-text-mask";
import {NgxMaskModule} from "ngx-mask";
import {AnimationsModule} from "../../../modules/animations/animations.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule,
    TextMaskModule,
    FormsModule,
    NgxMaskModule.forRoot({
      showMaskTyped: true,
    }),
    AnimationsModule,
    MatSnackBarModule,
    MatSidenavModule
  ],
  declarations: [
    TaskManagerComponent,
    AddTaskDialogComponent,
    ChangeTaskDialogComponent,
    TaskTableComponent
  ],
  entryComponents: [
    AddTaskDialogComponent,
    ChangeTaskDialogComponent],
  providers: [HttpService]
})
export class TaskManagerModule {
}

