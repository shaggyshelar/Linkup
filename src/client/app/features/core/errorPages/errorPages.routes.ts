import { Route } from '@angular/router';
import { UnauthorizedAccessComponent } from './unauthorizedAccess/unauthorizedAccess.component';

export const ErrorPagesRoutes: Route[] = [
  {
    path: 'forbidden',
    component: UnauthorizedAccessComponent
  }
];
