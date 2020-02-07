import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Booking} from '../../../../../component/booking';
import {ConstantsService} from '../../../../../services/constants.service';
import {FormControl} from '@angular/forms';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {SelectService} from '../../../../../services/select.service';
import {Subscription} from "rxjs";
import {Task} from '../../../../../component/task';


const URL = new ConstantsService().BASE_URL;

/**
 * @title Table with sticky header
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-table-component',
  styleUrls: ['../../../styles/table.css', '../../../styles/first-row-padding-fix.css'],
  templateUrl: 'booking-table.html',
})
export class BookingTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  isEmptyTable = false;
  private dataTransfer: DataTransferService;
  selectedRow: any;
  bookingList = new MatTableDataSource<Booking>();
  displayedColumns = [
    'id',
    'startDate',
    'endDate',
    'totalPrice',
    'comments',
    'createdDate',
    'review',
    'bookingStatus',
    'email',
    'nameClass',
    'roomNumber'
  ];

  subscription: Subscription;
  subscriptionDelete: Subscription;
  dataSource = this.bookingList;
  startDateFilter = new FormControl('');
  endDateFilter = new FormControl('');
  totalPriceFilter = new FormControl('');
  commentsFilter = new FormControl('');
  createdDateFilter = new FormControl('');
  reviewFilter = new FormControl('');
  bookingStatusFilter = new FormControl('');
  bookedByFilter = new FormControl('');
  apartmentClassFilter = new FormControl('');
  apartmentFilter = new FormControl('');

  filterValues = {
    id: '',
    startDate: '',
    endDate: '',
    totalPrice: '',
    comment: '',
    createdDate: '',
    review: '',
    bookingStatus: '',
    email: '',
    nameClass: '',
    apartmentRoomNumber: '',
  };

  constructor(private http: HttpClient, dataTransfer: DataTransferService, public selectService: SelectService) {
    super(selectService);
    this.getAllBookings();
    this.dataTransfer = dataTransfer;
    this.bookingList.filterPredicate = this.createFilter();
  }

  haveApartments(booking: any): boolean {
    return booking.apartment != null;
  }

  haveUser(booking: any): boolean {
    return booking.user != null;
  }

  selectRow(row: any): void {
    this.selectedRow = row.id;
    console.log(row);
    this.dataTransfer.setData(row);
    this.selectService.announceSelect(row);
  }


  ngOnInit() {
    this.subscription = this.selectService.addAnnounced$
      .subscribe(res => {
        if (res != null) {
          this.isEmptyTable = false;
          this.getAllBookings();
          this.ngAfterViewInit();
          this.selectService.announceAdd(null);
        }
      }, error => {
        console.log(error);
      });
    this.subscriptionDelete = this.selectService.deleteAnnounced$
      .subscribe(res => {
        if (res != null) {
          this.isEmptyTable = false;
          this.getAllBookings();
          this.ngAfterViewInit();
          this.selectService.announceDelete(null);
        }
      });

    this.startDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        startDate => {
          this.filterValues.startDate = startDate;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.endDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        endDate => {
          this.filterValues.endDate = endDate;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.totalPriceFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        totalPrice => {
          this.filterValues.totalPrice = totalPrice;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.commentsFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        comment => {
          this.filterValues.comment = comment;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.createdDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        createdDate => {
          this.filterValues.createdDate = createdDate;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.reviewFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        review => {
          this.filterValues.review = review;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.bookingStatusFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        bookingStatus => {
          this.filterValues.bookingStatus = bookingStatus;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.bookedByFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        email => {
          this.filterValues.email = email;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.apartmentClassFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        nameClass => {
          this.filterValues.nameClass = nameClass;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );

    this.apartmentFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        roomNumber => {
          this.filterValues.apartmentRoomNumber = roomNumber;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getAllBookings = () => {
    this.http.get(URL + 'bookings/').subscribe((res: Booking[]) => {
      this.dataSource.data = res;
      this.isEmptyTable = true;
    });
  }

  applyFilter(event: Event, key: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    // tslint:disable-next-line
    this.dataSource.filterPredicate = function(data, filter) {
      return data[key].toString().toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createFilter(): (data: any, filter: string) => boolean {
    // tslint:disable-next-line:only-arrow-functions
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      let result = data.startDate.toString().toLowerCase().indexOf(searchTerms.startDate) !== -1
        && data.endDate.toString().toLowerCase().indexOf(searchTerms.endDate) !== -1
        && data.totalPrice.toString().toLowerCase().indexOf(searchTerms.totalPrice) !== -1
        && data.createdDate.toString().toLowerCase().indexOf(searchTerms.createdDate) !== -1
        && data.bookingStatus.toString().toLowerCase().indexOf(searchTerms.bookingStatus) !== -1
        && data.apartmentClass.nameClass.indexOf(searchTerms.nameClass) !== -1;

      if (data.apartment !== null) {
        result = result && data.apartment.roomNumber.toString().toLowerCase().indexOf(searchTerms.roomNumber) !== -1;
      }

      if (data.user !== null) {
        result = result && data.user.firstname.indexOf(searchTerms.firstname) !== -1;
      }

      return result;
    };
    return filterFunction;
  }

}
