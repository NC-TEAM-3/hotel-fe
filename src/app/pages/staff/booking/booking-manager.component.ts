import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {AddBookingDialogComponent} from './components/add-booking-dialog/add-booking-dialog.component';
import {SelectService} from '../../../services/select.service';
import {Observable, Subscription} from 'rxjs';
import {Unsubscribable} from '../../../component/Unsubscribable';


@Component({
  selector: 'app-booking-manager',
  templateUrl: './booking-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class BookingManagerComponent extends Unsubscribable implements OnInit {
  id$: Observable<string>;
  subscription: Subscription;
  isOpenSidenav = 'false';

  constructor(public dialog: MatDialog, public selectService: SelectService) {
    super(selectService);
    this.subscription = this.selectService.selectAnnounced$
      .subscribe(id => {
        if (id != null) {
          this.isOpenSidenav = 'opened';
        }
        this.id$ = this.selectService.selectAnnounced$;
      });
  }

  ngOnInit(): void {
  }

  addApartmentDialog() {
    const dialogRef = this.dialog.open(AddBookingDialogComponent,
      {disableClose: true, autoFocus: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

