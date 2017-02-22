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
  selector: 'resigned-employee-list',
  templateUrl: 'resigned-employee-list.component.html'
})
export class ResignedEmployeeComponent implements OnInit {
  public leaveList: Leave[];

  constructor(
    private router: Router,
    private leaveService: LeaveService,
  ) {
    this.leaveList = [];
  }

  ngOnInit() {
    //this.leaveService.getResignedEmployeeLeave().subscribe((res: any) => {
      this.leaveList = [];
    //});
  }

  oneEditClicked() {
    this.router.navigate(['/leave/apply-leave']);
  }

}
