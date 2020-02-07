import {ChangeDetectorRef, Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import {AddApartmentsClassesDialogComponent} from './components/add-apartment-class-dialog/add-apartments-classes-dialog.component';
// tslint:disable-next-line:max-line-length
import {DeleteApartmentsClassesDialogComponent} from './components/delete-apartment-class-dialog/delete-apartments-classes-dialog.component';
import {MatExpansionPanel} from "@angular/material/expansion";
import {Unsubscribable} from "../../../component/Unsubscribable";
import {Observable, Subscription} from "rxjs";
import {SelectService} from "../../../services/select.service";


@Component({
  selector: 'app-apartments-classes-manager',
  templateUrl: './apartments-classes-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService],
  viewProviders: [MatExpansionPanel]
})

export class ApartmentsClassesManagerComponent extends Unsubscribable {
  id$: Observable<string>;
  subscription: Subscription;
  isOpenSidenav = 'false';

  constructor(public dialog: MatDialog,
              public selectService: SelectService) {
    super(selectService);
    this.subscription = this.selectService.selectAnnounced$
      .subscribe(id => {
        if (this.id$ != null) {
          this.isOpenSidenav = 'opened';
        }
        this.id$ = this.selectService.selectAnnounced$;
      });
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddApartmentsClassesDialogComponent, {disableClose: true, autoFocus: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

