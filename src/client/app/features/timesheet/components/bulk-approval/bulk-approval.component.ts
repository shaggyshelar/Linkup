/** Angular Dependencies */
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { Message } from 'primeng/primeng';

/** Module Level Dependencies */

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/index';

import { EmployeeTimeSheet } from '../../models/employee-timesheet';
import { EmployeeTimesheetService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'bulk-approval',
  templateUrl: 'bulk-approval.component.html',
  styleUrls: ['bulk-approval.component.css']
})
export class BulkApproveComponent implements OnInit {
  timesheetList: EmployeeTimeSheet[];
  selectAllBtn: boolean = true;
  selectedEmployees: EmployeeTimeSheet[];
  comments: string = '';

  constructor(
    private employeeTimesheetService: EmployeeTimesheetService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.selectedEmployees = [];
    this.getApproverTimesheet();
  }
  getApproverTimesheet() {
    this.timesheetList=[];
    this.employeeTimesheetService.getApproverPendingTimesheets().subscribe((res: any) => {
      if (res.length > 0) {
        this.timesheetList = res.reverse();
      }
    });
  }
  approveClicked() {
    if (this.selectedEmployees.length > 0) {
      let payload: any = {};
      payload.Comments = this.comments;
      payload.TimesheetIDs = [];
      for(let i=0;i<this.selectedEmployees.length;i++){
        payload.TimesheetIDs.push(this.selectedEmployees[i].ID);
      }
      this.employeeTimesheetService.bulkApproval(payload).subscribe(res => {
        if (res) {
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.TIMESHEET_APPROVE });
          this.getApproverTimesheet();
          this.comments = '';
          this.selectedEmployees = [];
        }
      });
    }
  }
  selectAllRecord() {
    this.selectedEmployees = this.timesheetList;
    this.selectAllBtn = false;
  }
  unSelectAllRecord() {
    this.selectedEmployees = [];
    this.selectAllBtn = true;
  }
}
