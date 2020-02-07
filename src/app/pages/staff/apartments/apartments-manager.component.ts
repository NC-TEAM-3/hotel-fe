import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddApartmentsDialogComponent} from './components/add-apartment-dialog/add-apartments-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteApartmentsDialogComponent} from './components/delete-apartment-dialog/delete-apartments-dialog.component';
import {SelectService} from "../../../services/select.service";
import {Observable, Subscription} from "rxjs";
import {MatExpansionPanel} from "@angular/material/expansion";
import {Unsubscribable} from "../../../component/Unsubscribable";


@Component({
  selector: 'app-apartments-manager',
  templateUrl: './apartments-manager.component.html',
  styleUrls: ['../styles/page.css'],
   viewProviders: [MatExpansionPanel]
})

export class ApartmentsManagerComponent extends Unsubscribable implements OnInit {
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

  addApartmentDialog() {
    const dialogRef = this.dialog.open(AddApartmentsDialogComponent,{disableClose: true, autoFocus: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

