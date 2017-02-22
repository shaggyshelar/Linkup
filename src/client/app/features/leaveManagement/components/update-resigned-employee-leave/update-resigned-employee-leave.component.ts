/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave';

@Component({
  moduleId: module.id,
  selector: 'update-resigned-employee-leave',
  templateUrl: 'update-resigned-employee-leave.component.html'
})
export class UpdateResignedEmployeeComponent implements OnInit {
  public leave: any;

  constructor(
    private router: Router,
    private leaveService: LeaveService,
  ) {
    this.leave = [];
  }

  ngOnInit() {
    this.leaveService.getLeaveDetails().subscribe((res: any) => {
      this.leave = res;
    });
  }

  cancel() {
    this.router.navigate(['/leave/resigned-employee-leaves']);
  }

}
