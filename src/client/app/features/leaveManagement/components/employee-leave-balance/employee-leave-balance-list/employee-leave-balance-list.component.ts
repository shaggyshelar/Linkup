/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { LeaveService } from '../../../services/index';
import { Leave } from '../../../models/leave';
import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'employee-leave-balance-list',
  templateUrl: 'employee-leave-balance-list.component.html'
})
export class EmployeeLeaveListComponent implements OnInit {
  public employeeLeaveList: Leave[];

  constructor(
    private router: Router,
    private leaveService: LeaveService,
  ) {
    this.employeeLeaveList = [];
  }

  ngOnInit() {
      let financialYear = moment().year();
        if(moment().month()<=2 ) {
            financialYear=financialYear-1;
        }
    this.leaveService.getEmployeeLeaveBalance(financialYear.toString()).subscribe((res: any) => {
      this.employeeLeaveList = res;
    });
  }

  oneEditClicked(leave:any) {
    this.router.navigate(['/leave/employee-leave-balance',leave.ID]);
  }

}
