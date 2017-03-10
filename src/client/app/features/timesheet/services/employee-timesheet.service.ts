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
const CONTEXT = 'EmployeeTimesheet';

/** Service Definition */
@Injectable()
export class EmployeeTimesheetService extends BaseService {

    constructor(public http: Http, messageService: MessageService, router: Router) {
        super(http, CONTEXT, messageService, router);
    }

    getMyTimesheets(): Observable<Employee> {
        return this.getChildList$('MyTimesheets', 0, 0, true).map(res => res.json());
    }
    getApproverPendingTimesheets(): Observable<Employee> {
        return this.getChildList$('ApproverPendingTimesheets', 0, 0, true).map(res => res.json());
    }
    getApproverApprovedTimesheets(): Observable<Employee> {
        return this.getChildList$('ApproverApprovedTimesheets', 0, 0, true).map(res => res.json());
    }
    getTimesheetApprovalData(id: any) {
        return this.getChildList$('GetTimesheetApprovalData/' + id, 0, 0, true).map(res => res.json());
    }
    approveTimesheet(payload: any) {
        let headers = new Headers();
        let body = JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let windowRef = this._window();
        windowRef['App'].blockUI();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/EmployeeTimesheet/Approve', body, options)
            .map(res => {
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
    rejectTimesheet(payload: any) {
        let headers = new Headers();
        let body = JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let windowRef = this._window();
        windowRef['App'].blockUI();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/EmployeeTimesheet/Reject', body, options)
            .map(res => {
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
    bulkApproval(payload: any) {
        let headers = new Headers();
        let body = JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let windowRef = this._window();
        windowRef['App'].blockUI();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/EmployeeTimesheet/BulkApprove', body, options)
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
