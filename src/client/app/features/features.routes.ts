import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, DashboardContainerComponent } from './core/dashboard/index';
import { ErrorPagesRoutes, AuthGuard, AuthRoutes } from './core/index';
import { CorporateRoutes } from './corporate/index';
import { AdminRoutes } from './admin/index';
import { ProfileRoutes } from './profile/index';
import { ChangePasswordRoutes } from './changePassword/index';
import { LeaveRoutes } from './leaveManagement/index';
import { TimesheetRoutes } from './timesheet/index';
import { ProjectRoutes } from './project/index';

export const featureRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'corporate',
        children: [...CorporateRoutes],
        canActivate: [AuthGuard],
        data: {
            permissions: ['CORPORATE.MANAGE']
        }
    },
     {
        path: 'admin',
        children: [...AdminRoutes],
        data: {
           permissions: ['ADMIN.MANAGE']
        }
    },
    {
        path: 'profile',
        children: [...ProfileRoutes],
        data: {
           permissions: ['PROFILE.MANAGE']
        }
    },
    {
        path: 'change-password',
        children: [...ChangePasswordRoutes]
    },
    {
        path: 'leave',
        children: [...LeaveRoutes]
    },
    {
        path: 'timesheet',
        children: [...TimesheetRoutes],
        canActivate: [AuthGuard]
    },
    {
        path: 'project',
        children: [...ProjectRoutes],
        canActivate: [AuthGuard],
        data: {
           permissions: ['PROJECT.MANAGE']
        }
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
