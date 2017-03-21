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
const CONTEXT = 'TeamMembers';

/** Service Definition */
@Injectable()
export class TeamMemberService extends BaseService {
    constructor(public http: Http, messageService: MessageService, router: Router) {
        super(http, CONTEXT, messageService, router);
    }
    getTeamByProject(id: string) {
        return this
            .getChildList$(id, 0, 0, true)
            .map(res => res.json());
    }
    getAllEmployee(): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        let windowRef = this._window();
        windowRef['App'].blockUI();
        return this.http.get(this.baseUrl + 'Employee/ByStatus/Active', options)
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
