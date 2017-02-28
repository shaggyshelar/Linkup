/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { LeaveTypeMasterService } from '../../../../../core/shared/services/master/leaveTypeMaster.service';

import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'leave-type-list',
  templateUrl: 'leave-type-list.component.html'
})
export class LeaveTypeListComponent implements OnInit {
  public leaveTypes:any;

  constructor(
    private router: Router,
    private leaveTypeService: LeaveTypeMasterService,
  ) {
    this.leaveTypes = [];
  }

  ngOnInit() {
    this.leaveTypeService.getLeaveTypes().subscribe((res:any) => {
        this.leaveTypes=res;
    });
  }

  onEditClicked(leave:any) {
    this.router.navigate(['/admin/masters/leave-type/edit',leave.ID]);
  }
 onAddClicked() {
    this.router.navigate(['/admin/masters/leave-type/new']);
  }
}
