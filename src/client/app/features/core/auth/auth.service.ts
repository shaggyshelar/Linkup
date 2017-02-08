import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../shared/index';

/** Context for service calls */
const CONTEXT = 'auth';

@Injectable()
export class AuthService extends BaseService {
    @Output() authStatus = new EventEmitter<boolean>();
    public currentUser:any;
    private authenticated = false;

    constructor(httpService: Http, private http : Http) {
        super(httpService, CONTEXT);
    }
    isAuthenticated() {
        if (localStorage.getItem('accessToken')) {
            this.authenticated = true;
            this.authStatus.emit(true);
            return true;
        } else {
            this.authenticated = false;
            this.authStatus.emit(false);
            return false;
        }
    }
    logout() {
        localStorage.clear();
        this.authenticated = false;
        this.authStatus.emit(false);
    }
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('loggedInUserDetails'));
    }
    authenticate(credentials: any): Observable<any> {
       // return this.post$('/auth/Token',credentials).map((res: Response) => { this.setToken(res); });
        let headers = new Headers();
        let credentialString : string = 'grant_type=password&UserName='+credentials.UserName+'&Password='+credentials.Password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/auth/Token', credentialString, options)
            .map((res: Response) => { this.setToken(res); })
            .catch(this.handleError);
    }
    getLoggedInUserPermission() {
        return this.getChildList$('permissions',0, 0, true).map((res: Response) => { this.setLoggedInUserPermission(res); });
    }
    getCurrentUserDetails() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get('api/Employee/currentuser',options).map((res: Response) => {
            this.setLoggedInUserDetail(res);
        });
    }
    private setToken(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('accessToken', body.access_token);
        this.authenticated = true;
        this.authStatus.emit(true);
    }
    private setLoggedInUserPermission(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('loggedInUserPermission', JSON.stringify(body));
    }
    private setLoggedInUserDetail(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('loggedInUserDetails', JSON.stringify(body));
    }
}
