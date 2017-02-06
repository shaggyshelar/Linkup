/** Angular Dependencies */
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { Message } from 'primeng/primeng';

/** Module Level Dependencies */
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave';
import { ApprovalForm } from '../../models/leaveApprovalValidation';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/services/message.service';

/** Component Declaration */


@Component({
  moduleId: module.id,
  selector: 'bulk-approval',
  templateUrl: 'bulk-approval.component.html',
  styleUrls: ['bulk-approval.component.css']
})
export class BulkApproveComponent implements OnInit {

  leaveObs: Observable<Leave[]>;

  servRows = 20;
  selectedEmployees: any[];
  bulkApprovalForm: FormGroup;
  model: any;

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
    this.leaveObs = this.leaveService.getApproverLeaves();
  }

  approveClicked({ value, valid }: { value: ApprovalForm, valid: boolean }) {
    if (valid) {
      this.model.comments = value.comments;
      if (this.selectedEmployees.length > 0) {
        //    BACKEND CALL HERE
        this.sendRequest('Approved');
      }
    }
  }

  rejectClicked({ value, valid }: { value: ApprovalForm, valid: boolean }) {
    if (valid) {
      this.model.comments = value.comments;
      if (this.selectedEmployees.length > 0) {
        //    BACKEND CALL HERE
        this.sendRequest('Rejected');
      }
    }
  }

  assembleReqPayload(status: string) {
    var payload:any = [];
    for (var index in this.selectedEmployees) {
      payload.push(
        {
          ID: this.selectedEmployees[index].ID,
          Comment: this.model.comments,
          Status: status
        });
    }

    return payload;
  }

  sendRequest(status:any) {
    return this.leaveService.updateLeaveRecord(1, this.assembleReqPayload(status)).subscribe(res => {
      if (res) {
        if (status === 'Rejected') {
          this.rejected = false;
          this.approved = true;
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leaves rejected!' });
        } else {
          this.rejected = true;
          this.approved = false;
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leaves approved!' });
        }
        this.leaveObs = this.leaveService.getApproverLeaves();
        this.bulkApprovalForm.reset();
        this.selectedEmployees = [];
      } else {
        this.messageService.addMessage({ severity: 'error', summary: 'Failed', detail: 'Failed to process your request.' });
      }
    });
  }

}
