/** Angular Dependencies */
import { Router, ActivatedRoute } from '@angular/router';
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
  param:string;
  constructor(
    private router: Router,
    private leaveService: LeaveService,
     private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.leave =  {
       Employee: {
           Name: ''
       },
      EmpID: '',
      ResignationDate: new Date(),
      LeaveDetails: {
      LeaveTaken: '',
      LeaveBalance: '',
      ActualBalance: '',
      FloatingHolidayBalance: '',
      ActualFHBalance:''
      }
    };
    this.route.params.subscribe(params => {
      this.param = params['id'];
    });
    this.leaveService.getResignedEmpLeaveDetails(this.param).subscribe((res: any) => {
      this.leave = res;
    });
  }

  cancel() {
    this.router.navigate(['/leave/resigned-employee-leaves']);
  }
  onSubmit() {
    let payload= {
        EmployeeLeaves:{
           LeaveBalance: this.leave.LeaveDetails.LeaveBalance,
           LeaveTaken: this.leave.LeaveDetails.LeaveBalance,
           FloatingHolidayBalance: this.leave.LeaveDetails.FloatingHolidayBalance,
           EmpID:this.leave.EmpID,
           ID: this.leave.ID
        },
        ResignationDate:this.leave.ResignationDate
    }
    this.leaveService.updateResignedEmpLeave(payload).subscribe((res: any) => {
       this.cancel();
    });
  }
}
