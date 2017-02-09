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
import { MessageService } from '../../../core/shared/services/message.service';

/** Component Declaration */

@Component({
  moduleId: module.id,
  selector: 'approve-leave',
  templateUrl: 'approve-leave.component.html'
})
export class ApproveLeaveComponent implements OnInit {

  leaveObs: Observable<Leave[]>;
  approvalRecords: any[];
  servRows = 10;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private leaveService: LeaveService
  ) { }

  ngOnInit() {
    this.leaveObs = this.leaveService.getApproverLeaves();
  }


  editBtnClicked(id: string) {
    this.router.navigate(['/leave/single-approval', id]);
  }

  approveLeave(id: string) {
    var params = {
        Comments: 'Approved!!',
        Status: 'Approved',
        LeaveRequestRefId:id
    };
    this.leaveService.singleLeaveApprove(params).subscribe(res => {
        if (res) {
            this.leaveObs = this.leaveService.getApproverLeaves();
            this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leave approved!' });
        } else {
            this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: 'Request not completed.' });
        }
    });
  }

  rejectLeave(id: string) {
      var params = {
        Comments: 'Rejected!!',
        Status: 'Rejected',
        LeaveRequestRefId:id
      };
      this.leaveService.singleLeaveReject(params).subscribe(res => {
        if (res) {
            this.leaveObs = this.leaveService.getApproverLeaves();
            this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leave approved!' });
        } else {
            this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: 'Request not completed.' });
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
    return '';
  }
}
