/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/index';
import { AuthService } from '../../../core/index';

/** Component Declaration */

@Component({
  moduleId: module.id,
  selector: 'approve-leave',
  templateUrl: 'approve-leave.component.html'
})
export class ApproveLeaveComponent implements OnInit {

  leaveList: Leave[];
  approvalRecords: any[];
  servRows = 10;
  userDetail: any;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private leaveService: LeaveService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userDetail = this.authService.getCurrentUser();
    this.getApproverLeave();
  }
  getApproverLeave() {
    this.leaveService.getApproverLeaves('Pending').subscribe((res: any) => {
      this.leaveList=[];
      if (res.length > 0) {
        this.leaveList = res.reverse();
      }
    });
  }
  checkIfApproverPresent(leave: any) {
    if (leave.PendingApprovers !== null) {
      for (let i = 0; i < leave.PendingApprovers.length; i++) {
        if (leave.PendingApprovers[i].ID === this.userDetail.Employee.ID) {
          return true;
        }
      }
    }
    return false;
  }

  editBtnClicked(id: string) {
    this.router.navigate(['/leave/single-approval', id]);
  }

  approveLeave(id: string) {
    var params = {
      Comments: 'Approved!!',
      Status: 'Approved',
      LeaveRequestRefId: id
    };
    this.leaveService.singleLeaveApprove(params).subscribe(res => {
      if (res) {
        this.getApproverLeave();
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.LEAVE_APPROVED });
      } else {
        this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: MessageService.REQUEST_FAILED });
      }
    });
  }

  rejectLeave(leave:any) {
    var params = {
      Comments: 'Rejected!!',
      Status: 'Rejected',
      LeaveRequestRefId: leave.LeaveRequestMasterId,
      StartDate:leave.StartDate,
      EndDate:leave.EndDate,
    };
    this.leaveService.singleLeaveReject(params).subscribe(res => {
      if (res) {
        this.getApproverLeave();
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.LEAVE_REJECTED });
      } else {
        this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: MessageService.REQUEST_FAILED });
      }
    });
  }
  getLeaveStatusClass(leave: any) {
    if (leave.Status === 'Pending') {
      return 'my-leaves-pending-leave';
    }
    if (leave.Status === 'Approved') {
      return 'my-leaves-approved-leave';
    }
    if (leave.Status === 'Rejected') {
      return 'my-leaves-rejected-leave';
    }
    if (leave.Status === 'Cancelled') {
      return 'my-leaves-cancelled-leave';
    }
    return '';
  }
}
