/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Skill } from '../models/skill';

/** Context for service calls */
export const CONTEXT = 'Skill';

/** Service Definition */
@Injectable()
export class SkillService extends BaseService {

    constructor( public http: Http) {
        super( http, CONTEXT);
    }

    getSkills(): Observable<Skill> {
        return this.getList$().map(res => res.json());
    }

    addSkill(params:any): Observable<boolean> {
        return this.post$(params).map(res => res.status === 200 ? true : false);
    }

    updateSkill(id:any, params:any): Observable<boolean> {
        return this.put$(id, params).map(res => res.status === 200 ? true : false);
    }
}
