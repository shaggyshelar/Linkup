/** Angular Dependencies */
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { LeaveTypeMasterService } from '../../../../core/shared/index';
import { LeaveService } from '../../../services/index';
import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'update-employee-leave',
  templateUrl: 'update-employee-leave.component.html'
})
export class UpdateEmployeeLeaveComponent implements OnInit {
  public leave: any;
  param: string;
  leaveType: any;
  model: any;
  constructor(
    private router: Router,
    private leaveService: LeaveService,
    private route: ActivatedRoute,
    private leaveTypeService: LeaveTypeMasterService,
  ) { }

  ngOnInit() {
    this.model = {
      leaveType: {},
      adjustmentEntry: ''
    };
    this.leave = {
      Employee: {
        Name: ''
      },
      EmpID: '',
      PLB: '',
      AccruedLeave: '',
      PaternityAdjustmentEntry: '',
      MarriageAdjustmentEntry: '',
      MaternityAdjustmentEntry: '',
      LeaveTaken: '',
      LeaveBalance: '',
      ActualBalance: '',
      HalfdayLeaveTaken: '',
      AbsentTaken: '',
      HalfdayAbsentTaken: ''
    };
    this.leaveType = [];
    this.route.params.subscribe(params => {
      this.param = params['id'];
    });
    this.leaveService.getEmpLeaveBalanceById(this.param).subscribe((res: any) => {
      this.leave = res;
    });
    this.leaveTypeService.getLeaveTypes().subscribe((res: any) => {
      this.leaveType.push({ label: 'Select', value: null });
      for (var index in res) {
        if (res[index].AdjustmentEntryApplicable === 'Yes') {
          this.leaveType.push({ label: res[index].Type, value: res[index] });
        }
      }
    });
  }

  cancel() {
    this.router.navigate(['/leave/employee-leave-balance']);
  }
  onSubmit() {
    let leaveType = '';
    switch (this.model.leaveType.Type) {
      case 'Marriage Leave': leaveType = 'MarriageAdjustmentEntry';
        break;
      case 'Paternity Leave': leaveType = 'PaternityAdjustmentEntry';
        break;
      case 'Maternity Leave': leaveType = 'MaternityAdjustmentEntry';
        break;
    }
    let payload: any = { ID: this.param };
    payload[leaveType] = this.model.adjustmentEntry;
    this.leaveService.updateEmpLeaveBalance(payload).subscribe((res: any) => {
      this.cancel();
    });
  }
  isNumberKey(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
}
