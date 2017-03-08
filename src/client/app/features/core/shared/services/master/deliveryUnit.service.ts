/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CacheService } from 'ng2-cache/ng2-cache';
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { BaseService } from '../../index';
import { Router } from '@angular/router';

/** Third Party Dependencies */
import { MessageService } from '../../index';
/** Context for service calls */
const CONTEXT = 'deliveryunit';

/** Service Definition */
@Injectable()
export class DeliveryUnitService extends BaseService {
    constructor(public http: Http, messageService: MessageService, router: Router, private _cacheService: CacheService) {
        super(http, CONTEXT, messageService, router);
    }
    getDeliveryUnitList() {
        if (this._cacheService.exists('deliveryUnit')) {
            return new Observable<any>((observer: any) => {
                observer.next(this._cacheService.get('deliveryUnit'));
            });
        } else {
            let windowRef = this._window();
            windowRef['App'].blockUI();
            return this.getList$(0, 0, true)
                .map(res => {
                    this._cacheService.set('deliveryUnit', res.json(), { maxAge: 60 * 60 });
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
                this._cacheService.remove('deliveryUnit');
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
        return this.http.post(this.baseUrl + 'deliveryunit/Update', body, options)
            .map(res => {
                this._cacheService.remove('deliveryUnit');
                windowRef['App'].unblockUI();
                return res.json();
            })
            .catch(err => {
                windowRef['App'].unblockUI();
                return this.handleError(err);
            });
    }
}
