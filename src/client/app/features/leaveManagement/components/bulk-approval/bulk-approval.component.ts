/** Angular Dependencies */
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { Message } from 'primeng/primeng';

/** Module Level Dependencies */
import { LeaveService } from '../../services/index';
import { Leave } from '../../models/leave';
import { ApprovalForm } from '../../models/leaveApprovalValidation';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/index';

/** Component Declaration */

@Component({
  moduleId: module.id,
  selector: 'bulk-approval',
  templateUrl: 'bulk-approval.component.html',
  styleUrls: ['bulk-approval.component.css']
})
export class BulkApproveComponent implements OnInit {

  leaveList: Leave[];

  servRows = 20;
  selectedEmployees: any[];
  bulkApprovalForm: FormGroup;
  model: any;
  selectAllBtn: boolean = true;
  approved: boolean = false;
  rejected: boolean = false;

  constructor(
    private messageService: MessageService,
    private leaveService: LeaveService,
    private formBuilder: FormBuilder
  ) {
    this.model = {
      comments: ''
    };

    this.bulkApprovalForm = this.formBuilder.group({
      comments: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(600)]]
    });
    this.selectedEmployees = [];
  }

  ngOnInit() {
    this.getApproverLeaves();
  }

  getApproverLeaves() {
    this.leaveService.getLeaveByStatus('Pending').subscribe((res: any) => {
      if (res.length > 0) {
        this.leaveList = res.reverse();
      }
    });
  }
  approveClicked({ value, valid }: { value: ApprovalForm, valid: boolean }) {
    if (valid) {
      this.model.comments = value.comments;
      if (this.selectedEmployees.length > 0) {
        //    BACKEND CALL HERE
        this.leaveService.bulkLeaveApproval(this.assembleReqPayload('Approved')).subscribe(res => {
          if (res) {
            this.rejected = true;
            this.approved = false;
            this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.LEAVE_APPROVED });
            this.getApproverLeaves();
            this.bulkApprovalForm.reset();
            this.selectedEmployees = [];
          } else {
            this.messageService.addMessage({ severity: 'error', summary: 'Failed', detail: MessageService.REQUEST_FAILED });
          }
        });
      }
    }
  }

  rejectClicked({ value, valid }: { value: ApprovalForm, valid: boolean }) {
    if (valid) {
      this.model.comments = value.comments;
      if (this.selectedEmployees.length > 0) {
        this.leaveService.bulkLeaveApproval(this.assembleReqPayload('Rejected')).subscribe(res => {
          if (res) {
            this.rejected = false;
            this.approved = true;
            this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.LEAVE_REJECTED });
            this.getApproverLeaves();
            this.bulkApprovalForm.reset();
            this.selectedEmployees = [];
          } else {
            this.messageService.addMessage({ severity: 'error', summary: 'Failed', detail: MessageService.REQUEST_FAILED });
          }
        });
      }
    }
  }

  assembleReqPayload(status: string) {
    var payload: any = {
      LeaveRequestIDs: [],
      StatusAndComments: {
        Comments: this.model.comments.trim(),
        Status: status
      }
    };
    for (var index in this.selectedEmployees) {
      payload.LeaveRequestIDs.push(
        {
          LeaveRequestRefId: this.selectedEmployees[index].LeaveRequestMasterId,
        });
    }
    return payload;
  }

  selectAllRecord() {
    this.selectedEmployees = this.leaveList;
    this.selectAllBtn = false;
  }
  unSelectAllRecord() {
    this.selectedEmployees = [];
    this.selectAllBtn = true;
  }
}
