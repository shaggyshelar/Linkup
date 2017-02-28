/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Leave } from '../models/leave';
// import { Employee } from '../models/employee';
import { LeaveDetail } from '../models/leaveDetail';
import { MessageService } from '../../core/shared/services/message.service';

/** Context for service calls */
export const CONTEXT = 'Leave';

/** Service Definition */
@Injectable()
export class LeaveService extends BaseService {
    editableLeave:any;
    constructor( public http: Http,messageService:MessageService,router:Router ) {
        super( http, CONTEXT,messageService,router);
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
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl+'LeaveDetails/'+refId,options)
        .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    getApproverListByRefID(refId:any): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl+'LeaveApprovers/'+refId,options)
        .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    getLeaveDetails(): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl+'EmployeeLeaves/GetMyLeaveDetails',options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
     getActiveProjects(): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl+'Project/GetMyActiveProjects',options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    getEmployeeDetail(Id:any): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl+'Employee/'+Id,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    getCurrentUserPendingLeaveCount() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl+'LeaveDetails/GetCurrentUserPendingLeaveCount',options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    checkIfAlreadyApplied(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let windowRef = this._window();
        windowRef['App'].blockUI();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+'LeaveDetails/GetAppliedLeaveForSameDate',body,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    checkIfAlreadyAppliedForTrainee(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let windowRef = this._window();
        windowRef['App'].blockUI();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+'LeaveDetails/GetCurrentUserCurrentMonthLeaveCount',body,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
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
    getLeaveByStatus(status:any): Observable<Leave[]> {
        return this.getChildList$('ByStatus/'+status,0,0,true).map(res => res.json());
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
        let windowRef = this._window();
        windowRef['App'].blockUI();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+'LeaveDetails',body,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    singleLeaveApprove(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.put(this.baseUrl+'LeaveApprovers/ApproveByManager',body,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    hrLeaveApprove(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.put(this.baseUrl+'LeaveApprovers/ApproveByHR',body,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    singleLeaveReject(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.put(this.baseUrl+'LeaveApprovers/RejectLeave',body,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    bulkLeaveApproval(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.put(this.baseUrl+'LeaveApprovers/BulkLeaveApproval',body,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
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
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.post(this.baseUrl+'Leave/cancel',body,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    getResignedEmployeeLeave(): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl+'Employee/GetResignedEmployeesLeaveBalance',options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    getResignedEmpLeaveDetails(id:string): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl+'Employee/GetResignedEmployeesLeaveBalance/'+id,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    updateResignedEmpLeave(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.post(this.baseUrl+'EmployeeLeaves/UpdateResignedEmployeeLeaves',body,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    getEmployeeLeaveBalance(year:string) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl+'EmployeeLeaves/'+year,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    getEmpLeaveBalanceById(id:string) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl+'EmployeeLeaves/ByID/'+id,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    updateEmpLeaveBalance(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.post(this.baseUrl+'EmployeeLeaves/Update',body,options)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    bulkUpdateLeave(payload:any) {
        let headers = new Headers();
        let formData:FormData = new FormData();
        formData.append('file', payload, payload.name);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
       // headers.append('Content-Type', 'multipart/form-data');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.post(this.baseUrl+'EmployeeLeaves/BulkUpdateEmployeeLeaveBalance',formData,options)
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
