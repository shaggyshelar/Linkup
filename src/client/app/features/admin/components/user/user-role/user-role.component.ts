/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

/** Other Module Dependencies */
import { Observable } from 'rxjs/Rx';

import { RoleService } from '../../../services/role.service';
import { UserRoleService } from '../../../services/user-role.service';
import { Role } from '../../../models/role';
import { MessageService } from '../../../../core/shared/services/message.service';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'admin-user-role',
    templateUrl: 'user-role.component.html',
})

export class UserRoleComponent implements OnInit {
    params: number;
    userRole: any;
    userName: string = '';
    roleList: Role[];
    roleDropdown: Role[];
    selectedRole: any=null;

    constructor(
     private messageService: MessageService,
     private roleService: RoleService,
     private userRoleService: UserRoleService,
     private route: ActivatedRoute,
     private router: Router) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.params = Number(params['id']);
            this.getAllRoles();
        });
    }

    getUserRole() {
        this.userRoleService.getUserRole(this.params)
            .subscribe(
            (results : any)=> {
                this.userName = results.UserName;
                this.userRole = results.Roles;
                this.setRoleDropdown();
            });
    }
    getAllRoles() {
        this.roleService.getRoles()
            .subscribe(
            results=> {
                this.roleList = <any>results;
                this.getUserRole();
            });
    }
    onAssignRole() {
        if (this.selectedRole !== '' &&  this.selectedRole!==null) {
            this.selectedRole.UserId = this.params;
            this.userRoleService.addUserRole(this.selectedRole)
                .subscribe(
                results=> {
                    this.selectedRole = null;
                    this.getUserRole();
                });
        }
    }

    onRevokeRole(role:any) {
        role.userId = this.params;
        this.userRoleService.revokeUserRole(role)
            .subscribe(
            results=> {
                this.getUserRole();
            });
    }

    private setRoleDropdown() {
        var flag = false;
        this.roleDropdown = [];
        for (var i = 0; i < this.roleList.length; i++) {
            for (var j = 0; j < this.userRole.length; j++) {
                if (this.roleList[i].Name === this.userRole[j].Name) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.roleDropdown.push(this.roleList[i]);
            }
            flag = false;
        }
    }
}

