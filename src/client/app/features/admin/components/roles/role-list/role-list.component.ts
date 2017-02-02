/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

/** Other Module Dependencies */
import { Observable } from 'rxjs/Rx';

import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role';
import { MessageService } from '../../../../core/shared/services/message.service';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'admin-role-list',
    templateUrl: 'role-list.component.html',
    styleUrls: ['role-list.component.css']
})

export class RoleListComponent implements OnInit {
    roleList: Observable<Role[]>;
    role: Role;
    errorMessage: any;
    constructor(private messageService: MessageService, private roleService: RoleService, private router: Router) {
        this.role = new Role(0, '');
    }
    ngOnInit() {
        this.getRole();
    }

    getRole() {
        this.roleList = this.roleService.getRoles();
    }
    onEditClick(role: Role) {
        this.router.navigate(['/admin/role/edit', role.ID]);
    }
    onDelete(role: Role) {
        this.roleService.deleteRole(role.ID)
            .subscribe((results:any) => {
                this.getRole();
                this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Record Deleted' });
            },
            (error:any) => this.errorMessage = <any>error);
    }
    goToAdd() {
        this.router.navigate(['/admin/role/add']);
    }
}

