import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {ConstantsService} from '../../../../../services/constants.service';
import {Booking} from "../../../../../component/booking";
import {Subscription} from "rxjs";
import {Apartments} from "../../../../../component/apartments";
import {User} from "../../../../../component/user";
import {BookingStatus} from "../../../../../component/booking-status.type";
import {SelectService} from "../../../../../services/select.service";
import {Unsubscribable} from "../../../../../component/Unsubscribable";
import {DatePipe} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-booking-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-booking-dialog.html',
})
export class AddBookingDialogComponent implements OnInit {
  isChangedStartPicker = false;
  isChangedEndPicker = false;
  addForm: FormGroup;
  booking = {} as Booking;
  subscription: Subscription;
  isError = false;
  isApartments = true;

  userList: User[];
  apartmentsClassesList: ApartmentsClass[];
  apartmentsList: Apartments[];
  selectedApartmentsClass: ApartmentsClass;
  selectedApartment: Apartments;
  user: User;
  selectedUser: User;
  status = [
    'Created',
    'CheckedIn',
    'Closed',
    'Canceled',
    'Confirmed'
  ];
  private selectedStatus: BookingStatus;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe,
              private http: HttpClient, public selectService: SelectService,
              private matDialogRef: MatDialogRef<AddBookingDialogComponent>,
              private snackBar: MatSnackBar) {
    this.getAllApartmentsClasses();
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalPrice: [''],
      comment: [''],
      review: [''],
      bookingStatus: ['', Validators.required],
      email: ['',
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+\\@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+$')],
      nameClass: ['', Validators.required],
      roomNumber: ['']
    });

    this.checkValid();
  }

  onSelectEmail(user: User): void {
    this.selectedUser = user;
  }

  checkValid() {
    this.addForm.markAllAsTouched();
    console.log('FormGroup: ', this.addForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.addForm.valid;
  }

  onSubmit() {
    this.isError = true;
    if (this.addForm.valid) {
      this.setBooking();
    }
  }

  getAllUsers() {
    this.http.get(URL + 'users').subscribe(res => {
      console.log(res);
      this.userList = (res as User[]);
    });
  }

  setBooking() {
    const startDateCleaned = this.datePipe.transform(this.addForm.value.startDate, 'yyyy-MM-dd');
    const endDateCleaned = this.datePipe.transform(this.addForm.value.endDate, 'yyyy-MM-dd');
    this.addForm.patchValue({
      startDate: startDateCleaned,
      endDate: endDateCleaned
    });
    this.booking.apartmentClass = this.selectedApartmentsClass;
    this.booking.apartment = this.selectedApartment;
    this.booking.startDate = this.addForm.value.startDate;
    this.booking.endDate = this.addForm.value.endDate;
    //this.booking.totalPrice = this.addForm.value.totalPrice;
    this.booking.comment = this.addForm.value.comment;
    this.booking.review = this.addForm.value.review;
    this.booking.bookingStatus = this.selectedStatus;
    this.booking.user = this.selectedUser;
    console.log(this.booking);
    this.createBooking();

  }

  onSelectAprtmntClass(apartmentsClass: ApartmentsClass): void {
    this.selectedApartmentsClass = apartmentsClass;
    const startDateTemp = this.datePipe.transform(this.addForm.value.startDate, 'yyyy-MM-dd');
    const endDateTemp = this.datePipe.transform(this.addForm.value.endDate, 'yyyy-MM-dd');
    console.log(this.addForm.value.startDate.toString());
    this.isApartments = false;
    this.getFreeApartments(startDateTemp.toString(), endDateTemp.toString(), apartmentsClass.id.toString());

  }

  onSelectApartment(apartments: Apartments): void {
    this.selectedApartment = apartments;
  }

  onSelectStatus(status: any): void {
    this.selectedStatus = status;
  }

  getUserByEmail() {
    let uList: User[];
    this.http.get(URL + 'users' + '?email=' + this.addForm.value.email).subscribe(
      res => {
        console.log(res);
        uList = (res as User[]);
        this.user = uList[0];
        console.log(this.user);
        this.setBooking();
      });
  }

  getAllApartmentsClasses() {
    this.http.get(URL + 'apartmentsClasses').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList = (res as ApartmentsClass[]);
    });
  }

  getFreeApartments(startDate: string, endDate: string, classId: string) {
    this.http.get(URL + 'bookings' + '/findList?' + 'startDate=' + startDate +
      // 2020-04-19
      '&endDate=' + endDate +
      // 2020-04-23
      '&apartmentClass=' + classId).subscribe(res => {
      console.log(res);
      this.apartmentsList = (res as Apartments[]);
      this.isApartments = true;
    });
  }

  createBooking() {
    this.http.post(URL + 'bookings/', this.booking).subscribe(
      res => {
        console.log(res);
        this.booking = (res as Booking);
        this.isError = false;
        this.matDialogRef.close();
        this.selectService.announceAdd(res);
        this.snackBar.open('Booking has been created!', 'Ok', {duration: 6000});
      }, error => {
        this.isError = false;
        this.snackBar.open('Error: '.concat(error.error), 'Ok', {duration: 6000});
      });
  }

  onClickStartPicker(): void {
    const startDateClean = this.datePipe.transform(this.addForm.value.startDate, 'yyyy-MM-dd');
    console.log(startDateClean.toString());
    this.addForm.patchValue({
      startDate: startDateClean
    });
    console.log(this.addForm.value.startDate);
    this.isChangedStartPicker = true;
  }

  onClickEndPicker(): void {
    const endDateClean = this.datePipe.transform(this.addForm.value.endDate, 'yyyy-MM-dd');
    console.log(this.addForm.value.endDate.getDate());
    this.addForm.patchValue({
      endDate: endDateClean
    });
    this.isChangedEndPicker = true;
  }

}



