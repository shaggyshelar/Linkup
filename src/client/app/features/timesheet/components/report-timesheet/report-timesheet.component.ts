/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';

/** Third Party Dependencies */
import { SelectItem } from 'primeng/primeng';

/** Module Level Dependencies */
import { Timesheet } from '../../models/timesheet';

/** Component Declaration */
@Component({
  moduleId: module.id,
  selector: 'report-timesheet',
  templateUrl: 'report-timesheet.component.html'
})
export class ReportTimesheetComponent implements OnInit {
  projects: SelectItem[];
  employee: SelectItem[];
  status: SelectItem[];
  timesheetReport: Timesheet[];

  ngOnInit(): void {

    this.projects = [];
    this.projects.push({ label: 'Select City', value: null });
    this.projects.push({ label: 'project1', value: { id: 1, name: 'project1' } });
    this.projects.push({ label: 'project2', value: { id: 2, name: 'project2' } });

    this.employee = [];
    this.employee.push({ label: 'Select Employee', value: null });
    this.employee.push({ label: 'employee1', value: { id: 1, name: 'employee1' } });
    this.employee.push({ label: 'employee2', value: { id: 2, name: 'employee2' } });

    this.status = [];
    this.status.push({ label: 'Select Status', value: null });
    this.status.push({ label: 'status1', value: { id: 1, name: 'status1' } });
    this.status.push({ label: 'status2', value: { id: 2, name: 'status2' } });

    this.timesheetReport =[];
  }

}
