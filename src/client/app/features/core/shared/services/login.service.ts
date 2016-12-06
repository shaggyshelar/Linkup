import { Injectable, EventEmitter } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoginService {
    public baseUrl: string = '/api/';
    onAuthStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public http: Http) {
    }

    protected toURL(apiURL: string): string {
        return this.baseUrl + apiURL;
    }

    authenticate(credentials: any) {
        let authenticateUrl = this.toURL('api/Authentication/GetToken');
        let headers = new Headers();
        let body = JSON.stringify(credentials);
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(authenticateUrl, body, options)
            .map((res: Response) => { this.setToken(res); })
            .catch(this.handleError);
    }


    getLoggedInUserPermission() {
        let url = this.toURL('api/GetLoggedInUserPermission');
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .map((res: Response) => {
                this.setLoggedInUserPermission(res);
                this.emitAuthEvent(true);
            })
            .catch(this.handleError);
    }

    getAuthEmitter() {
        return this.onAuthStatusChange;
    }

    emitAuthEvent(value: boolean) {
        this.onAuthStatusChange.emit(value);
    }

    logout() {
        localStorage.clear();
        this.emitAuthEvent(false);
    }

    isAuthenticated() {
        if (localStorage.getItem('accessToken')) {
            return true;
        } else {
            return false;
        }
    }

    setLoggedInUserPermission(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('loggedInUserPermission', JSON.stringify(body));
        return body || {};
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private setToken(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('accessToken', body.token);
        return body || {};
    }
}
