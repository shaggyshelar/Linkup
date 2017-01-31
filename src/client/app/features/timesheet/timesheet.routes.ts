/** Angular Depedencies */
import { Route } from '@angular/router';

/** Module Level Depedencies */
import { MyTimesheetComponent } from './components/my-timesheet/my-timesheet.component';
import { AddEditTimesheetComponent } from './components/add-edit-timesheet/add-edit-timesheet.component';
import { ApproveTimesheetComponent } from './components/approve-timesheet/approve-timesheet.component';
import { ApprovedTimesheetComponent } from './components/approved-timesheet/approved-timesheet.component';
import { ReportTimesheetComponent } from './components/report-timesheet/report-timesheet.component';
import { ViewApproveTimesheetComponent } from './components/approve-timesheet/view-approve-timesheet.component';

/** TimesheetRoutes Definition */
export const TimesheetRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'my',
    pathMatch: 'full'
  },
  {
    path: 'my',
    component: MyTimesheetComponent
  }, {
    path: 'add-edit',
    component: AddEditTimesheetComponent
  }, {
    path: 'approve',
    component: ApproveTimesheetComponent
  }, {
    path: 'approved',
    component: ApprovedTimesheetComponent
  }, {
    path: 'report',
    component: ReportTimesheetComponent
  }, {
    path: 'view-approve',
    component: ViewApproveTimesheetComponent
  }
];
