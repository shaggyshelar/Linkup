/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

/** Other Module Dependencies */
import { Observable } from 'rxjs/Rx';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { MessageService } from '../../../../core/shared/services/message.service';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'admin-user-list',
    templateUrl: 'user-list.component.html',
})

export class UserListComponent implements OnInit {
    userList: Observable<User[]>;
    constructor(
     private messageService: MessageService,
     private userService: UserService,
     private router: Router) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userList = this.userService.getUsers();
    }
    onManageRoleClick(user: User) {
        this.router.navigate(['/admin/users/manage-role', user.ID]);
    }
}

