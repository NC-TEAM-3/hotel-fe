import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from "@angular/material/dialog";
import {AddTaskDialogComponent} from "./add-task-dialog/add-task-dialog.component";
import {Observable} from "rxjs";
import {SelectService} from "../../../services/select.service";
import {Unsubscribable} from "../../../component/Unsubscribable";


@Component({
  selector: 'app-staff-tasks',
  templateUrl: './task.manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class TaskManagerComponent extends Unsubscribable {
  row$: Observable<any>;
  isOpenSidenav = 'false';

  constructor(public dialog: MatDialog, public selectService: SelectService) {
    super(selectService);
    this.selectService.selectAnnounced$
      .subscribe(id => {
        if (this.row$ != null) {
          this.isOpenSidenav = 'opened';
        }
        this.row$ = this.selectService.selectAnnounced$;
      });
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent,
      {disableClose: true, autoFocus: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

