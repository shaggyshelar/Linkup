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
const CONTEXT = 'Project';

/** Service Definition */
@Injectable()
export class ProjectService extends BaseService {
    constructor( public http: Http, messageService: MessageService, router: Router) {
        super( http, CONTEXT);
    }
    getProjectList() : Observable < Project[] > {
        return this
            .getChildList$('GetMyActiveProjects',0,0,true)
            .map(res => res.json());
    }
    getProjectById(id:string) : Observable < Project > {
        return this
            .get$(id,true)
            .map(res => res.json());
    }
    saveProject(project:any) : Observable < any > {
        return this
            .post$(project)
            .map(res => res.json());
    }
    editProject(project:any) : Observable < any > {
        return this
            .put$(project.Id, project)
            .map(res => res.json());
    }
}
