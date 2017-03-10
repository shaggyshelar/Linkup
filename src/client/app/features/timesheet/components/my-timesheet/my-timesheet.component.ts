/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

/** Module Level Dependencies */
import { EmployeeTimeSheet } from '../../models/employee-timesheet';
import { EmployeeTimesheetService } from '../../services/index';

/** Component Declaration */
@Component({
  moduleId: module.id,
  selector: 'my-timesheet',
  templateUrl: 'my-timesheet.component.html',
  styleUrls: ['my-timesheet.component.css']
})
export class MyTimesheetComponent implements OnInit {
  myTimeSheet: EmployeeTimeSheet[];

  constructor(
    private employeeTimesheetService: EmployeeTimesheetService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.myTimeSheet = [];
    this.employeeTimesheetService.getMyTimesheets().subscribe((res: any) => {
      if (res.length > 0) {
        this.myTimeSheet = res.reverse();
      }
    });
  }

  onEdit(id: any) {
    this.router.navigate(['/timesheet/edit-timesheet', id]);
  }
}
