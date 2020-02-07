import {ConstantsService} from "../../../../services/constants.service";
import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {Unsubscribable} from "../../../../component/Unsubscribable";
import {DataTransferService} from "../../../../services/data-transfer.service";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Task} from "../../../../component/task";
import {MatTableDataSource} from '@angular/material/table';
import {takeUntil} from 'rxjs/operators';
import {SelectService} from "../../../../services/select.service";
import {Subscription} from "rxjs";


const URL = new ConstantsService().BASE_URL;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'task-table-component',
  styleUrls: ['../../styles/table.css', '../../styles/first-row-padding-fix.css', './task-table.component.css'],
  templateUrl: 'task-table.html',
})
export class TaskTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  taskList = new MatTableDataSource<Task>();
  selectedTask: Task;
  isEmptyTable = false;
  displayedColumns = ['id', 'start', 'end', 'accept', 'complete', 'description', 'status', 'apartmentsRoomNumber', 'creatorEmail', 'executorEmail'];
  dataSource = this.taskList;
  startFilter = new FormControl('');
  endFilter = new FormControl('');
  acceptFilter = new FormControl('');
  completeFilter = new FormControl('');
  descriptionFilter = new FormControl('');
  statusFilter = new FormControl('');
  apartmentsRoomNumberFilter = new FormControl('');
  creatorFilter = new FormControl('');
  executorFilter = new FormControl('');
  subscription: Subscription;
  subscriptionDelete: Subscription;

  filterValues = {
    start: '',
    end: '',
    accept: '',
    complete: '',
    description: '',
    status: '',
    apartmentsRoomNumber: '',
    creatorEmail: '',
    executorEmail: ''
  };

  private dataTransfer: DataTransferService;
  selectedRow: any;

  constructor(private http: HttpClient, dataTransfer: DataTransferService, public selectService: SelectService) {
    super(selectService);
    console.log(this.dataTransfer);
    this.getAllTask();
    this.dataTransfer = dataTransfer;
    this.taskList.filterPredicate = this.createFilter();
  }

  selectRow(row: any): void {
    this.selectedRow = row.id;
    console.log(row);
    this.dataTransfer.setData(row);
    this.selectService.announceSelect(row);
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  haveTaskAccept(task: Task): boolean {
    if (task.accept == null) {
      return false;
    } else {
      return true;
    }
  }

  haveTaskComplete(task: Task): boolean {
    if (task.complete == null) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.subscription = this.selectService.addAnnounced$
      .subscribe(res => {
        if (res != null) {
          this.isEmptyTable = false;
          this.getAllTask();
          this.ngAfterViewInit();
          this.selectService.announceAdd(null);
        }
      }, error => {
        console.log(error);
      });

    this.startFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        start => {
          this.filterValues.start = start;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.endFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        end => {
          this.filterValues.end = end;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.acceptFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        accept => {
          this.filterValues.accept = accept;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.completeFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        complete => {
          this.filterValues.complete = complete;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.descriptionFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        description => {
          this.filterValues.description = description;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.statusFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        status => {
          this.filterValues.status = status;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.apartmentsRoomNumberFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        apartmentsRoomNumber => {
          this.filterValues.apartmentsRoomNumber = apartmentsRoomNumber;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.creatorFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        creatorEmail => {
          this.filterValues.creatorEmail = creatorEmail;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.executorFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        executorEmail => {
          this.filterValues.executorEmail = executorEmail;
          this.taskList.filter = JSON.stringify(this.filterValues);
        }
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getAllTask = () => {
    this.http.get(URL + 'tasks/').subscribe((res: Task[]) => {
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
    const filterFunction = function(data, filter): boolean {
      console.log('Data', data);
      console.log('Filter', filter);
      const searchTerms = JSON.parse(filter);
      let result = data.start.toString().toLowerCase().indexOf(searchTerms.start) !== -1
        && data.end.toString().toLowerCase().indexOf(searchTerms.end) !== -1
        && data.description.indexOf(searchTerms.description) !== -1
        && data.status.indexOf(searchTerms.status) !== -1
        && data.apartment.roomNumber.toString().toLowerCase().indexOf(searchTerms.roomNumber) !== -1
        && data.creator.user.email.indexOf(searchTerms.creator) !== -1
        && data.executor.user.email.indexOf(searchTerms.executor) !== -1
      if (data.accept !== null) {
        result = result && data.accept.toString().toLowerCase().indexOf(searchTerms.accept) !== -1;
      }
      if (data.complete !== null) {
        result = result && data.complete.toString().toLowerCase().indexOf(searchTerms.complete) !== -1;
      }

      return result;
    };
    return filterFunction;
  }

}
