import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        };
        if (route.data['permissions']) {
            if (localStorage.getItem('loggedInUserPermission') !== null) {
                var logggedInUserPermission = JSON.parse(localStorage.getItem('loggedInUserPermission'));
                for (var i = 0; i < route.data['permissions'].length; i++) {
                    if (logggedInUserPermission.indexOf(route.data['permissions'][i]) === -1) {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
        return true;
    }
}
