/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { LeaveService } from '../../services/leave.service';
import { UserService } from '../../services/user.service';
import { Leave } from '../../models/leave';
import { LeaveDetail } from '../../models/leaveDetail';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/services/message.service';

/** Component Declaration */


@Component({
  moduleId: module.id,
  selector: 'my-leaves',
  templateUrl: 'my-leaves.component.html'
})
export class MyLeavesComponent implements OnInit {
  public leaveObs: Observable<Leave>;
  public leaveDetObs: Observable<LeaveDetail>;
  public leaveDetail: LeaveDetail;
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
  }

  ngOnInit() {
    this.leaveObs = this.leaveService.getMyLeaves();
    this.userService.getLeaveDetails('LeaveDetails').subscribe((res:any) => {
        this.leaveDetail= res;
    });
  }

  applyLeaveClicked() {
    this.router.navigate(['/leave/apply-leave']);
  }

  updateBtnClicked(id:string) {
    this.router.navigate(['/leave/update-leave', id]);
  }

  arrangeData(leaveParam:any) {
    // TODO : Convert response into flat object
  }
}
