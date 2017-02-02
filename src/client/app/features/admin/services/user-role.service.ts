/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
//import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { User } from '../models/user';
/** Context for service calls */
export const CONTEXT = 'UserRole';

/** Service Definition */
@Injectable()
export class UserRoleService extends BaseService {

    constructor(public http: Http) {
        super( http, CONTEXT);
    }

    addUserRole(user:any): Observable<any> {
        return this.post$(user,true).map((res:Response) => res.json());
    }
    revokeUserRole(role:any): Observable<any> {
        return this.put$(role.ID,role,true).map((res:Response) => res.json());
    }
    getUserRole(userID:any): Observable<any> {
        return this.get$(userID,true).map((res:Response) => res.json());
    }
}
