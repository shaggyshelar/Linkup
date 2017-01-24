/** Angular Dependencies */
import { OnInit, Component  } from '@angular/core';

/** Module Level Dependencies */
import { Employee } from '../../models/employee';

/** Component Declaration */
@Component({
  moduleId: module.id,
  selector: 'approved-timesheet',
  templateUrl: 'approved-timesheet.component.html'
})
export class ApprovedTimesheetComponent implements OnInit {
  approvedEmployee: Employee[];

  ngOnInit(): void {
    this.approvedEmployee = [{
      id: 1,
      employee: 'xyz',
      approverUser: 'Abc',
      startDate: '20-11-2018',
      endDate: '25-11-2018',
      billableHours: 10,
      nonBillableHours: 2,
      status: 'Submitted',
      pendingApprover: 'pending Approver'
    },
      {
        id: 2,
        employee: 'Abc',
        approverUser: 'xyz',
        startDate: '25-11-2018',
        endDate: '28-11-2018',
        billableHours: 20,
        nonBillableHours: 12,
        status: 'Not-Submitted',
        pendingApprover: 'pending Approver'
      },
      {
        id: 3,
        employee: 'Abc',
        approverUser: 'DEF',
        startDate: '02-12-2018',
        endDate: '12-12-2018',
        billableHours: 30,
        nonBillableHours: 12,
        status: 'Approved',
        pendingApprover: 'pending Approver'
      }, {
        id: 4,
        approverUser: 'PQR',
        employee: 'wyz',
        startDate: '03-10-2017',
        endDate: '25-10-2017',
        billableHours: 20,
        nonBillableHours: 2,
        status: 'Submitted',
        pendingApprover: 'pending Approver'
      }, {
        id: 5,
        approverUser: 'stu',
        employee: 'PQR',
        startDate: '15-11-2017',
        endDate: '25-11-2017',
        billableHours: 17,
        nonBillableHours: 5,
        status: 'Not-Submitted',
        pendingApprover: 'pending Approver'
      }, {
        id: 6,
        approverUser: 'wyz',
        employee: 'stu',
        startDate: '17-10-2018',
        endDate: '20-10-2018',
        billableHours: 18,
        nonBillableHours: 12,
        status: 'Submitted',
        pendingApprover: 'pending Approver'
      }
    ];
  }
}
