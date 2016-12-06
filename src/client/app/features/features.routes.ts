import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, DashboardContainerComponent } from './core/dashboard/index';
import { AuthGuard } from './core/index';
const routes: Routes = [
    {
        path: '',
        component: DashboardContainerComponent,
        // canActivate: [AuthGuard],
        // children: [
        //     {
        //         path: 'timesheet',
        //         loadChildren: 'app/features/timesheet/timesheet.module#TimesheetModule'
        //     }
        // ]
    }
];
export const routing = RouterModule.forChild(routes);
