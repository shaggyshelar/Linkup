/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Address } from '../models/address';

/** Context for service calls */
export const CONTEXT = 'Address';

/** Service Definition */
@Injectable()
export class AddressService extends BaseService {

    constructor(public http: Http) {
        super( http, CONTEXT);
    }

    getAddress(): Observable<Address> {
        return this.getList$().map(res => res.json());
    }

    addAddress(params:any): Observable<boolean> {
        return this.post$(params).map(res => res.status === 200 ? true : false);
    }

    updateAddress(id, params): Observable<boolean> {
        return this.put$(id, params).map(res => res.status === 200 ? true : false);
    }
}
