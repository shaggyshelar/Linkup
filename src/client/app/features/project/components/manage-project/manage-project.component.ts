/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
/** Component Declaration */
import { Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'manage-project-component',
    templateUrl: 'manage-project.component.html',
    styleUrls: ['manage-project.component.css']
})

export class ManageProjectComponent implements OnInit {
   projectList: Observable<Project[]>;
    constructor(
         private projectService: ProjectService,
         private router: Router
    ) {}

    ngOnInit() {
        this.projectList = this.projectService.getProjectList();
    }
    onEdit(projectId:number) {
        this.router.navigate(['/project/edit', projectId]);
    }
}
