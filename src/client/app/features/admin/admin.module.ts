/** Angular Dependencies */
import { NgModule } from '@angular/core';

/** Other Module Dependencies */
import { CommonModule } from '../core/index';

/** Module level Dependencies */
import { FeatureComponent } from './components/feature/feature.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { RoleAddEditComponent } from './components/roles/role-add-edit/role-add-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { FeatureService } from './services/feature.service';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { UserService } from './services/user.service';
import { UserRoleService } from './services/user-role.service';
import { UserRoleComponent } from './components/user/user-role/user-role.component';
import { LeaveTypeListComponent } from './components/masters/leave-type/leave-type-list/leave-type-list.component';
import { LeaveTypeAddEditComponent } from './components/masters/leave-type/leave-type-add-edit/leave-type-add-edit.component';
import { DeliveryModelComponent } from './components/masters/delivery-model/delivery-model.component';
import { DeliveryUnitComponent } from './components/masters/delivery-unit/delivery-unit.component';
import { ProjectCategoryComponent } from './components/masters/project-category/project-category.component';
import { ClientTypeComponent } from './components/masters/client-type/client-type.component';
import { CurrencyComponent } from './components/masters/currency/currency.component';
import { ClientTypeService, CurrencyService } from '../core/shared/index';

/** Module Definition */
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [
        FeatureComponent,
        RoleListComponent,
        RoleAddEditComponent,
        UserListComponent,
        UserRoleComponent,
        LeaveTypeListComponent,
        LeaveTypeAddEditComponent,
        DeliveryModelComponent,
        DeliveryUnitComponent,
        ProjectCategoryComponent,
        ClientTypeComponent,
        CurrencyComponent
    ],
    providers: [FeatureService, RoleService, PermissionService, UserService, UserRoleService, ClientTypeService, CurrencyService],
})
export class AdminModule {
}
