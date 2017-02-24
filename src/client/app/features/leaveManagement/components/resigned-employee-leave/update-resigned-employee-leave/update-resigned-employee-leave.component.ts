/** Angular Dependencies */
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { LeaveService } from '../../../services/leave.service';
import * as moment from 'moment/moment';

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
      ResignationDate: moment(moment().format('MM/DD/YYYY')).toDate(),
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
      this.leave.ResignationDate=moment(moment(this.leave.ResignationDate, 'DD-MM-YYYY').format('MM/DD/YYYY')).toDate() ;
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
  isNumberKey(event:any) {
      var charCode = (event.which) ? event.which : event.keyCode;
      if (charCode !== 46 && charCode > 31
          && (charCode < 48 || charCode > 57))
            return false;
      return true;
  }
}
