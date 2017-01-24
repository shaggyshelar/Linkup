/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { User } from '../models/user';

/** Context for service calls */
export const CONTEXT = 'profile';

/** Service Definition */
@Injectable()
export class ProfileService extends BaseService {

    constructor( public http: Http) {
        super( http, CONTEXT);
    }

    getProfile(id): Observable<User> {
        return this.get$(id).map(res => res.json());
    }
}
