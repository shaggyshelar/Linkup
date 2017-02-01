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
export const CONTEXT = 'User';

/** Service Definition */
@Injectable()
export class UserService extends BaseService {

    constructor(public http: Http) {
        super( http, CONTEXT);
    }

    getUsers(): Observable<User[]> {
        return this.getList$(0,0,true).map((res:Response) => res.json());
    }
    addUser(user:any): Observable<any> {
        return this.post$(user,true).map((res:Response) => res.json());
    }
    editUser(user:any): Observable<any> {
        return this.put$(user.ID,user,true).map((res:Response) => res.json());
    }
    getUserById(userID:any): Observable<any> {
        return this.get$(userID,true).map((res:Response) => res.json());
    }
    deleteUser(userID:any): Observable<any> {
        return this.delete$(userID,true);
    }
}
