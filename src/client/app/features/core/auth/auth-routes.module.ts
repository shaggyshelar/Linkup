import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';

export const AuthRoutes: Routes = [
    { path: 'login', component: AuthComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(AuthRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }