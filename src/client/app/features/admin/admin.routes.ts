import { Routes } from '@angular/router';
import { FeatureComponent } from './components/feature/feature.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { RoleAddEditComponent } from './components/roles/role-add-edit/role-add-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserRoleComponent } from './components/user/user-role/user-role.component';
import { AuthGuard } from '../core/index';

export const AdminRoutes: Routes = [
  {
    path: 'feature',
    component: FeatureComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['FEATURE.READ']
    }
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserListComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: ['USER.READ']
        }
      },
      {
        path: 'manage-role/:id',
        component: UserRoleComponent,
        canActivate: [AuthGuard],
        data: {
           permissions: ['USER.READ']
         }
       },
    ]
  },
  {
    path: 'role',
    children: [
      {
        path: '',
        component: RoleListComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: ['ROLE.READ']
        }
      },
      {
        path: 'add',
        component: RoleAddEditComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: ['ROLE.CREATE']
        }
      },
      {
        path: 'edit/:roleId',
        component: RoleAddEditComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: ['ROLE.UPDATE']
        }
      },
    ]
  },
];
