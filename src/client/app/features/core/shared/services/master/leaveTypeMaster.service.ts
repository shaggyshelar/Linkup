/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CacheService } from 'ng2-cache/ng2-cache';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

/** Third Party Dependencies */
import { MessageService } from '../message.service';
import { BaseService } from '../../../index';
// import { Employee } from '../models/employee';

/** Context for service calls */
const CONTEXT = 'LeaveType';

/** Service Definition */
@Injectable()
export class LeaveTypeMasterService extends BaseService {

    constructor(public http: Http, messageService: MessageService, router: Router, private _cacheService: CacheService) {
        super(http, CONTEXT, messageService, router);
    }

    /**
     * getHolidays method
     * Gets array of Holiday objects
     */
    getLeaveTypes() {
        if (this._cacheService.exists('leaveType')) {
            return new Observable<any>((observer: any) => {
                observer.next(this._cacheService.get('leaveType'));
            });
        } else {
            let windowRef = this._window();
            windowRef['App'].blockUI();
            return this.getList$(0, 0, true)
                .map(res => {
                    this._cacheService.set('leaveType', res.json(), { maxAge: 60 * 60 });
                    windowRef['App'].unblockUI();
                    return res.json();
                })
                .catch(err => {
                    windowRef['App'].unblockUI();
                    return this.handleError(err);
                });
        }

    }
    getById(id: string) {
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.get$(id, true)
            .map(res => {
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
    save(payload: any) {
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.post$(payload, true)
            .map(res => {
                this._cacheService.remove('leaveType');
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
    update(payload: any) {
        let headers = new Headers();
        let body = JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.post(this.baseUrl + 'LeaveType/Update', body, options)
            .map(res => {
                this._cacheService.remove('leaveType');
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
}
