/** Angular Depedencies */
import { Routes } from '@angular/router';

/** Module Level Depedencies */
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from '../core/index';

export const ChangePasswordRoutes: Routes = [
  {
    path: '',
    redirectTo: 'change',
    pathMatch: 'full'
  },
  {
    path: 'change',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: ['PASSWORD.UPDATE']
    }
  }
];
