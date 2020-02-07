import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {AddStaffDialogComponent} from './components/add-staff-dialog/add-staff-dialog.component';
import {MatExpansionPanel} from "@angular/material/expansion";
import {Observable, Subscription} from "rxjs";
import {SelectService} from "../../../services/select.service";
import {Unsubscribable} from "../../../component/Unsubscribable";


@Component({
  selector: 'app-staff-manager',
  templateUrl: './staff-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService],
  viewProviders: [MatExpansionPanel]
})

export class StaffManagerComponent extends Unsubscribable {
  row$: Observable<any>;
  subscription: Subscription;
  isOpenSidenav = 'false';

  constructor(public dialog: MatDialog, public selectService: SelectService) {
    super(selectService);
    this.subscription = this.selectService.selectAnnounced$
      .subscribe(id => {
        if (this.row$ != null) {
          this.isOpenSidenav = 'opened';
        }
        this.row$ = this.selectService.selectAnnounced$;
      });
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddStaffDialogComponent,
      {disableClose: true, autoFocus: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}




