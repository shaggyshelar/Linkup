/** Angular Depedencies */
import { Routes } from '@angular/router';

/** Module Level Depedencies */
import { AuthGuard } from '../core/index';
import { ManageProjectComponent } from './components/manage-project/manage-project.component';
import { AddEditProjectComponent } from './components/add-edit-project/add-edit-project.component';


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
      permissions: ['PROJECTS.MANAGEMYPROJECTS.MANAGE']
    }
  },
   {
    path: 'add',
    component: AddEditProjectComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['PROJECTS.MANAGEMYPROJECTS.ADD']
    }
  },
  {
    path: 'edit/:id',
    component: AddEditProjectComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['PROJECTS.MANAGEMYPROJECTS.UPDATE']
    }
  },
];
