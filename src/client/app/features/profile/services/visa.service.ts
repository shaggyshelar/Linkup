/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Visa } from '../models/visa';

/** Context for service calls */
export const CONTEXT = 'Visa';

/** Service Definition */
@Injectable()
export class VisaService extends BaseService {

    constructor(public http: Http) {
        super( http, CONTEXT);
    }

    getVisa(): Observable<Visa> {
        return this.getList$().map(res => res.json());
    }

    addVisa(params:any): Observable<boolean> {
        return this.post$(params).map(res => res.status === 200 ? true : false);
    }

    updateVisa(id:any, params:any): Observable<boolean> {
        return this.put$(id, params).map(res => res.status === 200 ? true : false);
    }
}
