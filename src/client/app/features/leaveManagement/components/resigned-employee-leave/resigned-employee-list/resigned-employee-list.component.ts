/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { LeaveService } from '../../../services/index';
import { Leave } from '../../../models/leave';

@Component({
  moduleId: module.id,
  selector: 'resigned-employee-list',
  templateUrl: 'resigned-employee-list.component.html'
})
export class ResignedEmployeeComponent implements OnInit {
  public employeeLeaveList: Leave[];

  constructor(
    private router: Router,
    private leaveService: LeaveService,
  ) {
    this.employeeLeaveList = [];
  }

  ngOnInit() {
    this.leaveService.getResignedEmployeeLeave().subscribe((res: any) => {
      this.employeeLeaveList = res;
    });
  }

  oneEditClicked(leave: any) {
    this.router.navigate(['/leave/resigned-employee', leave.ID]);
  }

}
