/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Timesheet } from '../models/timesheet';
import { Employee } from '../models/employee';

/** Context for service calls */
const CONTEXT = 'EmployeeTimesheet';

/** Service Definition */
@Injectable()
export class EmployeeTimesheetService extends BaseService {

    constructor(public http: Http) {
        super(http, CONTEXT);
    }

    getMyTimesheets(): Observable<Employee> {
        return this.getChildList$('MyTimesheets').map(res => res.json());
    }
    getApproverPendingTimesheets(): Observable<Employee> {
        return this.getChildList$('ApproverPendingTimesheets').map(res => res.json());
    }
    getApproverApprovedTimesheets(): Observable<Employee> {
        return this.getChildList$('ApproverApprovedTimesheets').map(res => res.json());
    }

}
