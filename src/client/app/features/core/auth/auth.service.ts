import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BaseService } from '../shared/index';

export const CONTEXT = 'login';

@Injectable()
export class AuthService extends BaseService {
    private authenticated = false;

    constructor(httpService: Http, private router: Router) {
        super(httpService, CONTEXT);
    }
    isAuthenticated() {
        return this.authenticated;
    }

    authenticate(username: string, password: string) {
        this.router.navigate(['/']);
        this.authenticated = true;
        return true;
    }

}
