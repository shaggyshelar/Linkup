/** Angular Dependencies */
import { Routes } from '@angular/router';

/** Module Level Dependencies */
import { AuthComponent } from './auth.component';

/** Routes Definition */
export const AuthRoutes: Routes = [
    { path: 'login', component: AuthComponent },
];
