/** Angular Depedencies */
import { Route } from '@angular/router';

/** Module Level Depedencies */
import { MyTimesheetComponent } from './components/my-timesheet/my-timesheet.component';
import { AddEditTimesheetComponent } from './components/add-edit-timesheet/add-edit-timesheet.component';
import { ApproveTimesheetComponent } from './components/approve-timesheet/approve-timesheet.component';
import { ApprovedTimesheetComponent } from './components/approved-timesheet/approved-timesheet.component';
import { ReportTimesheetComponent } from './components/report-timesheet/report-timesheet.component';
import { ViewApproveTimesheetComponent } from './components/approve-timesheet/view-approve-timesheet.component';
import { AuthGuard } from '../core/index';

/** TimesheetRoutes Definition */
export const TimesheetRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'my',
    pathMatch: 'full'
  },
  {
    path: 'my',
    component: MyTimesheetComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['TIMESHEET.MYTIMESHEET.MANAGE']
    }
  }, {
    path: 'enter-timesheet',
    component: AddEditTimesheetComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['TIMESHEET.MYTIMESHEET.READ']
    }
  }, {
    path: 'approve',
    component: ApproveTimesheetComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['TIMESHEET.APPROVETIMESHEETS.MANAGE']
    }
  }, {
    path: 'approved',
    component: ApprovedTimesheetComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['TIMESHEET.APPROVEDTIMESHEETS.MANAGE']
    }
  }, {
    path: 'report',
    component: ReportTimesheetComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['TIMESHEET.MYTIMESHEET.READ']
    }
  }, {
    path: 'view-approve',
    component: ViewApproveTimesheetComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['TIMESHEET.APPROVETIMESHEETS.MANAGE']
    }
  }
];
