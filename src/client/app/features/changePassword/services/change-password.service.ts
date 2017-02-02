/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { ChangePassword } from '../models/changePassword';

/** Context for service calls */
export const CONTEXT = 'ChangePassword';

/** Service Definition */
@Injectable()
export class ChangePasswordService extends BaseService {
    constructor( public http: Http) {
        super( http, CONTEXT);
    }


    /**
     * changePassword method
     * Put request to change password.
     * @ID : Parameter : ID of user to update
     * @payload : Parameter : Object of entity to be updated
     */
    changePassword(payload:any): Observable<any> {
        return this.post$(payload).map(res => res.status === 200 ? res.json() : res.json());
    }
}
