/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

/** Module Level Dependencies */
import { EmployeeTimeSheet } from '../../models/employee-timesheet';
import { EmployeeTimesheetService } from '../../services/index';

/** Component Declaration */
@Component({
  moduleId: module.id,
  selector: 'approved-timesheet',
  templateUrl: 'approved-timesheet.component.html'
})
export class ApprovedTimesheetComponent implements OnInit {
  approvedEmployee: EmployeeTimeSheet[];

  constructor(private employeeTimesheetService: EmployeeTimesheetService, private router: Router) { }
  ngOnInit(): void {
    this.approvedEmployee = [];
    this.employeeTimesheetService.getApproverApprovedTimesheets().subscribe((res: any) => {
      if (res.length > 0) {
        this.approvedEmployee = res.reverse();
      }
    });
  }
  onEdit(id: any) {
    this.router.navigate(['/timesheet/view-approve', id]);
  }
}
