/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Leave } from '../models/leave';
// import { Employee } from '../models/employee';
import { LeaveDetail } from '../models/leaveDetail';

/** Context for service calls */
export const CONTEXT = 'Leave';

/** Service Definition */
@Injectable()
export class LeaveService extends BaseService {
    editableLeave:any;
    constructor( public http: Http) {
        super( http, CONTEXT);
    }

    /**
     * getLeave method
     * Gets leave object corresponding to ID specified
     */
    getLeave(id:any): Observable<Leave> {
        return this.get$(id).map(res => res.json());
    }

    /**
     * getLeaves method
     * Gets array of leaves
     */
    getLeaves(): Observable<Leave> {
        return this.getList$(0,0,true).map(res => res.json());
    }
    getMyLeaves(): Observable<Leave> {
        return this.getChildList$('myleaves',0,0,true).map(res => res.json());
    }
    getApproverLeaves(): Observable<Leave[]> {
        return this.getChildList$('ApproverLeaves',0,0,true).map(res => res.json());
    }
    getLeaveDetailByRefID(refId:any): Observable<Leave[]> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'LeaveDetails/'+refId,options).map((res => res.json()));
    }
    getApproverListByRefID(refId:any): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'LeaveApprovers/'+refId,options).map((res => res.json()));
    }
    getLeaveDetails(): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'EmployeeLeaves/GetMyLeaveDetails',options).map((res => res.json()));
    }
     getActiveProjects(): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'Project/GetMyActiveProjects',options).map((res => res.json()));
    }
    getEmployeeDetail(Id:any): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'Employee/'+Id,options).map((res => res.json()));
    }
    setEditableLeave(leave:any) {
        this.editableLeave=leave;
    }
    getEditableLeave() {
       return this.editableLeave;
    }
    /**
     * getLeaveArray method
     * Gets child array in the object to be returned. List of applied leaves, in this case
     * @methodParam mandatory parameter
     */
    getLeaveArray(methodParam:any): Observable<LeaveDetail> {
        return this.getChildList$(methodParam).map(res => res.json());
    }

    /**
     * addLeaveRecord method
     * Adds leave record. returns true if successful, false if not.
     */
    submitLeaveRecord(leavePayload:any): Observable<boolean> {
        let headers = new Headers();
        let body=JSON.stringify(leavePayload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+'LeaveDetails',body,options).map((res => res.json()));

       // return this.post$(leavePayload).map(res => res.status === 201 ? true : false);
    }

    /**
     * getChildRecord method
     * Gets data form the path extension specified.
     * @params : Parameter : path extension
     */
    getChildRecord(params:any): Observable<any> {
        return this.getChildList$(params).map(res => res.json());
    }

    /**
     * updateLeaveRecord method
     * Put request to update a record.
     * @ID : Parameter : ID of entity to update
     * @payload : Parameter : Object with properties of entity to be updated
     */
    updateLeaveRecord(ID:any, payload:any): Observable<boolean> {
        return this.put$(ID, payload).map(res => res.status === 200 ? true : false);
    }

    /**
     * deleteLeaveRecord method
     * Delete request to delete a record.
     * @ID : Parameter : ID of entity to update
     */
    deleteLeaveRecord(leavePayload:any): Observable<boolean> {
        let headers = new Headers();
        let body=JSON.stringify(leavePayload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+'Leave/cancel',body,options).map((res => res.json()));
    }
}
