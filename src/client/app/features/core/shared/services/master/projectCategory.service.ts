/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CacheService } from 'ng2-cache/ng2-cache';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

/** Module Level Dependencies */
import { BaseService } from '../../index';
import { MessageService } from '../../index';

/** Context for service calls */
const CONTEXT = 'projectcategory';

/** Service Definition */
@Injectable()
export class ProjectCategoryService extends BaseService {
    constructor(public http: Http, messageService: MessageService, router: Router, private _cacheService: CacheService) {
        super(http, CONTEXT, messageService, router);
    }
    getProjectCategories() {
        if (this._cacheService.exists('projectCategory')) {
            return new Observable<any>((observer: any) => {
                observer.next(this._cacheService.get('projectCategory'));
            });
        } else {
            let windowRef = this._window();
            windowRef['App'].blockUI();
            return this.getList$(0, 0, true)
                .map(res => {
                    this._cacheService.set('projectCategory', res.json(), { maxAge: 60 * 60 });
                    windowRef['App'].unblockUI();
                    return res.json();
                })
                .catch(err => {
                    windowRef['App'].unblockUI();
                    return this.handleError(err);
                });
        }
    }
    add(payload: any) {
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.post$(payload, true)
            .map(res => {
                this._cacheService.remove('projectCategory');
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
    edit(payload: any) {
        let headers = new Headers();
        let body = JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.post(this.baseUrl + 'projectcategory/Update', body, options)
            .map(res => {
                this._cacheService.remove('projectCategory');
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
}
