/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CacheService } from 'ng2-cache/ng2-cache';
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { BaseService } from '../../index';

/** Context for service calls */
const CONTEXT = 'deliverymodel';

/** Service Definition */
@Injectable()
export class DeliveryModelService extends BaseService {
    constructor(public http: Http, private _cacheService: CacheService) {
        super(http, CONTEXT);
    }
    getDeliveryModelList() {
        if (this._cacheService.exists('deliveryModel')) {
            return new Observable<any>((observer: any) => {
                observer.next(this._cacheService.get('deliveryModel'));
            });
        } else {
            let windowRef = this._window();
            windowRef['App'].blockUI();
            return this.getList$(0, 0, true)
                .map(res => {
                    this._cacheService.set('deliveryModel', res.json(), { maxAge: 60 * 60 });
                    windowRef['App'].unblockUI();
                    return res.json();
                })
                .catch(err => {
                    windowRef['App'].unblockUI();
                    return this.handleError(err);
                });
        }
    }
    add(payload: any) {
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.post$(payload, true)
            .map(res => {
                this._cacheService.remove('deliveryModel');
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
    edit(payload: any) {
        let headers = new Headers();
        let body = JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.post(this.baseUrl + 'deliverymodel/Update', body, options)
            .map(res => {
                this._cacheService.remove('deliveryModel');
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
}
