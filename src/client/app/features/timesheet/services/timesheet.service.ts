/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { MessageService } from '../../core/shared/index';
/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Timesheet } from '../models/timesheet';
import { Employee } from '../models/employee';

/** Context for service calls */
const CONTEXT = 'Timesheets';

/** Service Definition */
@Injectable()
export class TimesheetService extends BaseService {

    constructor(public http: Http, messageService: MessageService, router: Router) {
        super(http, CONTEXT, messageService, router);
    }

    /**
     * getTimesheets method
     */
    getTimesheets(): Observable<Timesheet> {
        return this.getList$(0, 0, true).map(res => res.json());
    }

    getTimesheetByID(id: string) {
        return this.getChildList$('Edit/' + id, 0, 0, true).map(res => res.json());
    }
    saveTimesheet(payload: any) {
        let headers = new Headers();
        let body = JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let windowRef = this._window();
        windowRef['App'].blockUI();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/Timesheet/Save', body, options)
            .map(res => {
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
}
