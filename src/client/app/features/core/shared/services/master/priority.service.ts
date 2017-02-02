/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
//import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../index';

/** Context for service calls */
export const CONTEXT = 'priorityMaster';

/** Service Definition */
@Injectable()
export class PriorityService extends BaseService {
    constructor( public http: Http) {
        super(http, CONTEXT);
    }
    getPriorityList() {
        return this.getList$(0,0,true).map(res => res.json());
    }
}
