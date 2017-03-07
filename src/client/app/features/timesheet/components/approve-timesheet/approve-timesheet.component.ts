/** Angular Declarations */
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

/** Module Level Dependencies */
import { EmployeeTimeSheet } from '../../models/employee-timesheet';
import { EmployeeTimesheetService } from '../../services/index';

/** Component Declarations */
@Component({
  moduleId: module.id,
  selector: 'approve-timesheet',
  templateUrl: 'approve-timesheet.component.html',
  styleUrls: ['approve-timesheet.component.css']
})
export class ApproveTimesheetComponent implements OnInit {
  approveEmployee: EmployeeTimeSheet[];

  constructor(
    private employeeTimesheetService: EmployeeTimesheetService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.approveEmployee = [];
    this.employeeTimesheetService.getApproverPendingTimesheets().subscribe((res: any) => {
      if (res.length > 0) {
        this.approveEmployee = res.reverse();
      }
    });
  }

  selectEmployee(id: any) {
    this.router.navigate(['/timesheet/view-approve', id]);
  }
}
