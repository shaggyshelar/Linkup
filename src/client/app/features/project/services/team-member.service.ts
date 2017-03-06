/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
    constructor( public http: Http, messageService: MessageService, router: Router) {
        super( http, CONTEXT);
    }
    getTeamByProject(id:string) {
        return this
            .getChildList$(id,0,0,true)
            .map(res => res.json());
    }
}
