/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Education } from '../models/education';

/** Context for service calls */
export const CONTEXT = 'Education';

/** Service Definition */
@Injectable()
export class EducationService extends BaseService {

    constructor(public http: Http) {
        super(http, CONTEXT);
    }

    getEducation(): Observable<Education> {
        return this.getList$().map(res => res.json());
    }

    addEducation(params): Observable<boolean> {
        return this.post$(params).map(res => res.status === 200 ? true : false);
    }

    updateEducation(id, params): Observable<boolean> {
        return this.put$(id, params).map(res => res.status === 200 ? true : false);
    }
}
