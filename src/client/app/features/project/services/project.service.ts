/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Project } from '../models/project';

/** Context for service calls */
export const CONTEXT = 'project';

/** Service Definition */
@Injectable()
export class ProjectService extends BaseService {
    constructor( public http: Http) {
        super( http, CONTEXT);
    }
    getProjectList() : Observable < Project[] > {
        return this
            .getList$(0,0,true)
            .map(res => res.json());
    }
}
