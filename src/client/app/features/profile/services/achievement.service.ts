/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Achievement } from '../models/achievement';

/** Context for service calls */
export const CONTEXT = 'Achievement';

/** Service Definition */
@Injectable()
export class AchievementService extends BaseService {

    constructor(public http: Http) {
        super(http, CONTEXT);
    }

    getAchievements(): Observable<Achievement> {
        return this.getList$().map(res => res.json());
    }

    addAchievement(params:any): Observable<boolean> {
        return this.post$(params).map(res => res.status === 200 ? true : false);
    }

    updateAchievement(id:string, params:any): Observable<boolean> {
        return this.put$(id, params).map(res => res.status === 200 ? true : false);
    }
}
