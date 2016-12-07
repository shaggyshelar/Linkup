import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, DashboardContainerComponent } from './core/dashboard/index';
import { ErrorPagesRoutes, AuthGuard, AuthRoutes } from './core/index';

export const featureRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
];

const routes: Routes = [
    ...AuthRoutes,
    {
        path: '',
        component: DashboardContainerComponent,
        canActivate: [AuthGuard],
        children: [
            ...featureRoutes,
            ...ErrorPagesRoutes,
        ]
        // children: [
        //     {
        //         path: 'timesheet',
        //         loadChildren: 'app/features/timesheet/timesheet.module#TimesheetModule'
        //     }
        // ]
    }
];
export const routing = RouterModule.forChild(routes);
