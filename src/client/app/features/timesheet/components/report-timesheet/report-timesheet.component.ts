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

    this.timesheetReport = [{
      id: 1,
      employeeName: 'abc',
      project: 'project1',
      date: '01-10-2015',
      task: 'Development',
      billableHours: 8,
      nonBillableHours: 2,
      status: 'Submitted',
      totalHours: 10,
      noteBillableHours: 'note Billable Hours1',
      noteNonBillableHours: 'note NonBillable Hours1'
    }, {
        id: 2,
        employeeName: 'abc',
        project: 'project1',
        date: '02-10-2015',
        task: 'Development',
        billableHours: 6,
        nonBillableHours: 2,
        status: 'Submitted',
        totalHours: 8,
        noteBillableHours: 'note Billable Hours2',
        noteNonBillableHours: 'note NonBillable Hours2'
      }, {
        id: 3,
        employeeName: 'abc',
        project: 'project1',
        date: '03-10-2015',
        task: 'Development',
        billableHours: 8,
        nonBillableHours: 2,
        status: 'Submitted',
        totalHours: 10,
        noteBillableHours: 'note Billable Hours3',
        noteNonBillableHours: 'note NonBillable Hours3'
      }, {
        id: 4,
        employeeName: 'abc',
        project: 'project1',
        date: '04-10-2015',
        task: 'Development',
        billableHours: 7,
        nonBillableHours: 2,
        status: 'Submitted',
        totalHours: 9,
        noteBillableHours: 'note Billable Hours4',
        noteNonBillableHours: 'note NonBillable Hours4'
      }, {
        id: 5,
        employeeName: 'abc',
        project: 'project1',
        date: '05-10-2015',
        task: 'Development',
        billableHours: 8,
        nonBillableHours: 2,
        status: 'Submitted',
        totalHours: 10,
        noteBillableHours: 'note Billable Hours5',
        noteNonBillableHours: 'note NonBillable Hours5'
      }, {
        id: 6,
        employeeName: 'abc',
        project: 'project1',
        date: '02-11-2015',
        task: 'Development',
        billableHours: 8,
        nonBillableHours: 0,
        status: 'Submitted',
        totalHours: 8,
        noteBillableHours: 'note Billable Hours6',
        noteNonBillableHours: 'note NonBillable Hours6'
      },
    ];
  }

}
