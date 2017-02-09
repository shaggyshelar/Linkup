/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/** Module Level Dependencies */
import { Select } from '../../../../leaveManagement/models/select';
import { BaseService } from '../../../index';
// import { Employee } from '../models/employee';

/** Context for service calls */
const CONTEXT = 'LeaveType';

/** Service Definition */
@Injectable()
export class LeaveTypeMasterService extends BaseService {

    constructor( public http: Http) {
        super( http, CONTEXT);
    }

    /**
     * getHolidays method
     * Gets array of Holiday objects
     */
    getLeaveTypes(): Observable<Select> {
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.getList$(0,0,true)
        .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
}
