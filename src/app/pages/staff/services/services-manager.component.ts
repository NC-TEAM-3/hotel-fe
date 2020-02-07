import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {AddServicesDialogComponent} from './components/add-services-dialog/add-services-dialog.component';
import {SelectService} from "../../../services/select.service";
import {Unsubscribable} from "../../../component/Unsubscribable";
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-service-manager',
  templateUrl: './services-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class ServicesManagerComponent extends Unsubscribable {
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
    const dialogRef = this.dialog.open(AddServicesDialogComponent,
      {disableClose: true, autoFocus: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

