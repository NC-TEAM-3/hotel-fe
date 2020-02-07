import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {AddUnavailableApartmentDialogComponent} from './components/add-unavailable-apartment-dialog/add-unavailable-apartment-dialog.component';
import {SelectService} from '../../../services/select.service';
import {Observable, Subscription} from 'rxjs';
import {Unsubscribable} from '../../../component/Unsubscribable';


@Component({
  selector: 'app-unavailable-apartments-manager',
  templateUrl: './unavailable-apartments-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class UnavailableApartmentsManagerComponent extends Unsubscribable implements OnInit {
  id$: Observable<string>;
  subscription: Subscription;
  isOpenSidenav = 'false';

  constructor(public dialog: MatDialog, public selectService: SelectService) {
    super(selectService);
    this.subscription = this.selectService.selectAnnounced$
      .subscribe(id => {
        if (this.id$ != null) {
          this.isOpenSidenav = 'opened';
        }
        this.id$ = this.selectService.selectAnnounced$;
      });
  }

  ngOnInit(): void {
  }

  addUnavailableApartmentDialog() {
    const dialogRef = this.dialog.open(AddUnavailableApartmentDialogComponent,
      {disableClose: true, autoFocus: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

