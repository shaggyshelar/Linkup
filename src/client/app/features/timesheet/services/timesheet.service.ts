/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
const CONTEXT = 'timesheet';

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

    /**
     * getEmployeesDefinition
     */
    getEmployees(): Observable<Employee> {
        return this.getChildList$('employee', 0, 0, true).map(res => res.json());
    }
}
