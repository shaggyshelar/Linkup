/** Angular Depedencies */
import { Routes } from '@angular/router';

/** Module Level Depedencies */
import { ManageProjectComponent } from './components/manage-project/manage-project.component';
import { AuthGuard } from '../core/index';

export const ProjectRoutes: Routes = [
  {
    path: '',
    redirectTo: 'manage',
    pathMatch: 'full'
  },
  {
    path: 'manage',
    component: ManageProjectComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['PROJECT.READ']
    }
  },
];
