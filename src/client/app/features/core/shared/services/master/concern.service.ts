/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { BaseService } from '../../index';

/** Context for service calls */
export const CONTEXT = 'concernMaster';

/** Service Definition */
@Injectable()
export class ConcernService extends BaseService {
    constructor(public http: Http) {
        super(http,CONTEXT);
    }
    getConcernList() {
        return this.getList$(0,0,true).map(res => res.json());
    }
}
