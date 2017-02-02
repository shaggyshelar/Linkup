/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { EmploymentHistory } from '../models/employmentHistory';

/** Context for service calls */
export const CONTEXT = 'EmploymentHistory';

/** Service Definition */
@Injectable()
export class EmploymentHistoryService extends BaseService {

    constructor(public http: Http) {
        super(http, CONTEXT);
    }

    getEmploymentHistory(): Observable<EmploymentHistory> {
        return this.getList$().map(res => res.json());
    }

    addEmploymentHistory(params:any): Observable<boolean> {
        return this.post$(params).map(res => res.status === 200 ? true : false);
    }

    updateEmploymentHistory(id:any, params:any): Observable<boolean> {
        return this.put$(id, params).map(res => res.status === 200 ? true : false);
    }
}
