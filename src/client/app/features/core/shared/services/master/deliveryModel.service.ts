/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

/** Module Level Dependencies */
import { BaseService } from '../../index';

/** Context for service calls */
const CONTEXT = 'deliverymodel';

/** Service Definition */
@Injectable()
export class DeliveryModelService extends BaseService {
    constructor( public http: Http) {
        super(http, CONTEXT);
    }
    getDeliveryModelList() {
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
    add(payload:any) {
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.post$(payload,true)
         .map(res => {
            windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    edit(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.post(this.baseUrl+'deliverymodel/Update',body,options)
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
