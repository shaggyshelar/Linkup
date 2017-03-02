/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { LeaveService, UserService } from '../../services/index';
import { Leave } from '../../models/leave';
import { LeaveDetail } from '../../models/leaveDetail';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/index';
import * as moment from 'moment/moment';
/** Component Declaration */


@Component({
  moduleId: module.id,
  selector: 'my-leaves',
  templateUrl: 'my-leaves.component.html'
})
export class MyLeavesComponent implements OnInit {
  public myLeaveList: Leave[];
  public leaveDetObs: Observable<LeaveDetail>;
  public leaveDetail: any;
  showLeaves: any;
  servRows = 5;
  leaves: {};
  leave: any;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private leaveService: LeaveService,
    private userService: UserService
  ) {
    this.leaves = [];
    this.showLeaves = false;
  }

  ngOnInit() {
    this.leaveService.getMyLeaves().subscribe((res: any) => {
      if (res.length > 0) {
        this.myLeaveList = res.reverse();
      }
    });
    this.leaveService.getLeaveDetails().subscribe((res: any) => {
      this.leaveDetail = res;
    });
  }

  applyLeaveClicked() {
    this.router.navigate(['/leave/apply-leave']);
  }

  showMyLeaves() {
    this.showLeaves = !this.showLeaves;
  }

  updateBtnClicked(leave: any) {
    this.leaveService.setEditableLeave(leave);
    this.router.navigate(['/leave/update-leave', leave.LeaveRequestMasterId]);
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

  arrangeData(leaveParam: any) {
    // TODO : Convert response into flat object
  }
}
