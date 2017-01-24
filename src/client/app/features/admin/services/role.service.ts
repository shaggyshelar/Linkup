/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
//import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Role } from '../models/role';
/** Context for service calls */
export const CONTEXT = 'role';

/** Service Definition */
@Injectable()
export class RoleService extends BaseService {

    constructor( public http: Http) {
        super( http, CONTEXT);
    }

    getRoles(): Observable<Role[]> {
        return this.getList$(0,0,true).map((res:Response) => res.json());
    }
    addRole(role:Role): Observable<any> {
        return this.post$(role,true).map((res:Response) => res.json());
    }
    editRole(role:Role): Observable<any> {
        return this.put$(role.ID,role,true).map((res:Response) => res.json());
    }
    getRoleById(roleID:string): Observable<any> {
        return this.get$(roleID,true).map((res:Response) => res.json());
    }
    deleteRole(roleID:string): Observable<any> {
        return this.delete$(roleID,true);
    }
}
