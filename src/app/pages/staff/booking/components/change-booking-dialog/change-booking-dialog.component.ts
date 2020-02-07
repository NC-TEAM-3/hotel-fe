import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {Booking} from '../../../../../component/booking';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {SelectService} from '../../../../../services/select.service';
import {Subscription} from 'rxjs';
import {User} from '../../../../../component/user';
import {Apartments} from '../../../../../component/apartments';
import {BookingStatus} from '../../../../../component/booking-status.type';
import {MatDialog} from '@angular/material';
import {DeleteBookingDialogComponent} from '../delete-booking-dialog/delete-booking-dialog.component';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-change-booking-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-booking-dialog.html',
})
export class ChangeBookingDialogComponent extends Unsubscribable implements OnInit {
  isChangedStartPicker = false;
  isChangedEndPicker = false;
  changeForm: FormGroup;

  isError = false;
  apartmentClassId: string;
  booking = {} as Booking;
  subscription: Subscription;
  userList: User[];
  selectedUser: User;
  apartmentsClassesList: ApartmentsClass[];
  apartmentsList: Apartments[];
  selectedApartmentsClass: ApartmentsClass;
  selectedApartment: Apartments;
  user: User;
  public selected: any;

  status = [
    'Created',
    'CheckedIn',
    'Closed',
    'Canceled',
    'Confirmed'
  ];
  private selectedStatus: BookingStatus;

  // tslint:disable-next-line:max-line-length
  private startDateStr: string;
  private endDateStr: string;
  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private dataTransfer: DataTransferService,
              public selectService: SelectService,
              private datePipe: DatePipe,
              private snackBar: MatSnackBar) {
    super(selectService);
    this.getAllApartmentsClasses();
    this.getAllUsers();
    this.booking = dataTransfer.getData();
    console.log(this.booking);
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      startDate: [this.booking.startDate],
      endDate: [this.booking.endDate],
      // totalPrice: [this.booking.totalPrice],
      comment: [this.booking.comment],
      review: [this.booking.review],
      bookingStatus: [this.booking.bookingStatus],
      email: [this.getEmail(this.booking.user)],
      nameClass: [this.booking.apartmentClass.nameClass],
      roomNumber: [this.getRoomNumber(this.booking.apartment), Validators.required]
    });

    this.getUserByEmail();

    this.checkValid();

    this.subscription = this.selectService.selectAnnounced$
      .subscribe(row => {
        console.log(row);
        this.selectedStatus = this.booking.bookingStatus;
        this.selectedApartmentsClass = this.booking.apartmentClass;
        if (this.booking.apartment !== null) {
          this.selectedApartment = this.booking.apartment;
        }
        if (this.booking.user !== null) {
          this.selectedUser = this.booking.user;
        }
        this.fillForm(row);
      });
  }

  getRoomNumber(apartment: Apartments): string {
    const roomNumber = '';
    if (apartment != null) {
      this.isError = true;
      this.http.get(URL + 'bookings' + '/findList?'
        + 'startDate=' + this.startDateStr
        + '&endDate=' + this.endDateStr
        + '&apartmentClass=' + this.apartmentClassId)
        .subscribe(res => {
          this.apartmentsList = (res as Apartments[]);
          this.apartmentsList.push(apartment);
          this.onSelectAprtmnt(apartment);
          this.booking.apartment = apartment;
          this.changeForm.patchValue({
            roomNumber: apartment.roomNumber
          });
          this.isError = false;
          return this.changeForm.value.roomNumber;
        });
    } else {
      this.isError = true;
      this.http.get(URL + 'bookings' + '/findList?'
        + 'startDate=' + this.startDateStr
        + '&endDate=' + this.endDateStr
        + '&apartmentClass=' + this.apartmentClassId)
        .subscribe(res => {
          this.changeForm.patchValue({
            roomNumber: ''
          });
          this.apartmentsList = (res as Apartments[]);
          this.isError = false;
        });
    }
    return roomNumber;
  }

  getEmail(user: User): string {
    let email = '';
    if (user !== null) {
      email = user.email.toString();
    }
    return email;
  }

  fillForm(row: Booking) {
    this.apartmentClassId = row.apartmentClass.id.toString();
    this.startDateStr = row.startDate.toString();
    this.endDateStr = row.endDate.toString();
    this.changeForm.setValue({
      startDate: row.startDate,
      endDate: row.endDate,
      // totalPrice: row.totalPrice,
      comment: row.comment,
      review: row.review,
      bookingStatus: row.bookingStatus,
      email: this.getEmail(row.user),
      nameClass: row.apartmentClass.nameClass,
      roomNumber: this.getRoomNumber(row.apartment)
    });
  }

  checkValid() {
    this.changeForm.markAllAsTouched();
    console.log('FormGroup: ', this.changeForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.changeForm.valid;
  }

  onClickStartPicker(): void {
    const startDateClean = this.datePipe.transform(this.changeForm.value.startDate, 'yyyy-MM-dd');
    console.log(startDateClean.toString());
    this.changeForm.patchValue({
      startDate: startDateClean
    });
    console.log(this.changeForm.value.startDate);
    this.isChangedStartPicker = true;
  }

  onClickEndPicker(): void {
    const endDateClean = this.datePipe.transform(this.changeForm.value.endDate, 'yyyy-MM-dd');
    console.log(this.changeForm.value.endDate.getDate());
    this.changeForm.patchValue({
      endDate: endDateClean
    });
    this.isChangedEndPicker = true;
  }

  onSubmit() {
    this.isError = true;
    if (this.changeForm.valid) {
      this.setBooking();
      this.createBooking();
    }
  }

  createBooking() {
    this.http.put(URL + 'bookings/' + this.booking.id, this.booking).subscribe(
      res => {
        console.log(res);
        this.booking = (res as Booking);
        this.isError = false;
        this.snackBar.open('Booking has been changed!', 'Ok', {duration: 6000});
      }, error => {
        this.isError = false;
        this.snackBar.open('Error: '.concat(error.error), 'Ok', {duration: 6000});
      });
  }

  setBooking() {
    this.booking.apartmentClass = this.selectedApartmentsClass;
    this.booking.apartment = this.selectedApartment;
    this.booking.startDate = this.changeForm.value.startDate;
    this.booking.endDate = this.changeForm.value.endDate;
    // this.booking.totalPrice = this.addForm.value.totalPrice;
    this.booking.comment = this.changeForm.value.comment;
    this.booking.review = this.changeForm.value.review;
    this.booking.bookingStatus = this.selectedStatus;
    this.booking.user = this.selectedUser;
    console.log(this.booking);
  }

  onSelectAprtmntClass(apartmentsClass: ApartmentsClass): void {
    this.selectedApartmentsClass = apartmentsClass;
    this.getFreeApartments(this.changeForm.value.startDate.toString(),
      this.changeForm.value.endDate.toString(), apartmentsClass.id.toString());
    console.log(this.changeForm.value.startDate.toString());
  }

  onSelectAprtmnt(apartments: Apartments): void {
    this.selectedApartment = apartments;
  }

  onSelectEmail(user: User): void {
    this.selectedUser = user;
  }

  onSelectStatus(status: any): void {
    this.selectedStatus = status;
  }

  getUserByEmail() {
    let uList: User[];
    this.http.get(URL + 'users' + '?email=' + this.changeForm.value.email).subscribe(
      res => {
        console.log(res);
        uList = (res as User[]);
        this.user = uList[0];
        console.log(this.user);
      });
  }

  getAllApartmentsClasses() {
    this.http.get(URL + 'apartmentsClasses').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList = (res as ApartmentsClass[]);
    });
  }

  getAllUsers() {
    this.http.get(URL + 'users').subscribe(res => {
      console.log(res);
      this.userList = (res as User[]);
    });
  }

  getFreeApartments(startDate: string, endDate: string, classId: string) {
    this.http.get(URL + 'bookings' + '/findList?'
      + 'startDate=' + startDate
      + '&endDate=' + endDate
      + '&apartmentClass=' + classId)
      .subscribe(res => {
        console.log(res);
        this.apartmentsList = (res as Apartments[]);
      });
  }

  getAllApartments() {
    this.http.get(URL + 'apartments').subscribe(res => {
      this.apartmentsList = (res as Apartments[]);
    });
  }

  deleteBooking() {
    const dialogRef = this.dialog.open(DeleteBookingDialogComponent,
      {disableClose: true, autoFocus: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



