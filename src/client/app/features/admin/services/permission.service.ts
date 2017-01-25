/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
//import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
/** Context for service calls */
export const CONTEXT = 'permission';

/** Service Definition */
@Injectable()
export class PermissionService extends BaseService {

    constructor( public http: Http) {
        super(http, CONTEXT);
    }

    getAllPermission(): Observable<any> {
        return this.getList$(0,0,true).map(res => res.json());
    }
    getPermissionsByRole(roleId:any): Observable<any> {
        return this.get$(roleId,true).map(res => res.json());
    }
    addPermissionToRole(permission:any): Observable<any> {
        return this.post$(permission,true).map(res => res.json());
    }
    revokePermission(permission:any): Observable<any> {
        return this.put$(permission.ID,permission,true);
    }
}
