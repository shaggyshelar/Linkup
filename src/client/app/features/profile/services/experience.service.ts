/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Framework Level Dependencies */
import { AnalyticsService } from '../../framework.ref';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Experience } from '../models/experience';

/** Context for service calls */
export const CONTEXT = 'Experience';

/** Service Definition */
@Injectable()
export class ExperienceService extends BaseService {

    constructor( public http: Http) {
        super( http, CONTEXT);
    }

    getExperience(): Observable<Experience> {
        return this.getList$().map(res => res.json());
    }

    addExperience(params): Observable<boolean> {
        return this.post$(params).map(res => res.status === 200 ? true : false);
    }

    updateExperience(id, params): Observable<boolean> {
        return this.put$(id, params).map(res => res.status === 200 ? true : false);
    }
}
