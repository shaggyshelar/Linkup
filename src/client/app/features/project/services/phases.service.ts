/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { MessageService } from '../../core/shared/index';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Project } from '../models/project';

/** Context for service calls */
const CONTEXT = 'Phases';

/** Service Definition */
@Injectable()
export class PhasesService extends BaseService {
    constructor(public http: Http, messageService: MessageService, router: Router) {
        super(http, CONTEXT, messageService, router);
    }
    getPhasesByProject(payload: any) {
        let headers = new Headers();
        let body = JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let windowRef = this._window();
        windowRef['App'].blockUI();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + 'Phases/GetPhasesByProject', body, options)
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
