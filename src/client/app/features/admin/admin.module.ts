/** Angular Dependencies */
import { NgModule } from '@angular/core';

/** Other Module Dependencies */
import { CommonModule } from '../core/index';

/** Module level Dependencies */
import { FeatureComponent } from './components/feature/feature.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { RoleAddEditComponent } from './components/roles/role-add-edit/role-add-edit.component';
import { FeatureService } from './services/feature.service';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';

/** Module Definition */
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [
        FeatureComponent,
        RoleListComponent,
        RoleAddEditComponent
    ],
    providers: [FeatureService, RoleService, PermissionService],
})
export class AdminModule {
}
