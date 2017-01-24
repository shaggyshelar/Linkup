/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Uan } from '../models/uan';

/** Context for service calls */
export const CONTEXT = 'Uan';

/** Service Definition */
@Injectable()
export class UanService extends BaseService {

    constructor( public http: Http) {
        super( http, CONTEXT);
    }

    getUan(): Observable<Uan> {
        return this.getList$().map(res => res.json());
    }

    addUan(params): Observable<boolean> {
        return this.post$(params).map(res => res.status === 200 ? true : false);
    }

    updateUan(id, params): Observable<boolean> {
        return this.put$(id, params).map(res => res.status === 200 ? true : false);
    }
}
