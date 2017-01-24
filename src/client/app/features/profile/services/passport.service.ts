/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Passport } from '../models/passport';

/** Context for service calls */
export const CONTEXT = 'Passport';

/** Service Definition */
@Injectable()
export class PassportService extends BaseService {

    constructor( public http: Http) {
        super( http, CONTEXT);
    }

    getPassport(): Observable<Passport> {
        return this.getList$().map(res => res.json());
    }
    addPassport(params): Observable<boolean> {
        return this.post$(params).map(res => res.status === 200 ? true : false);
    }

    updatePassport(id, params): Observable<boolean> {
        return this.put$(id, params).map(res => res.status === 200 ? true : false);
    }
}
