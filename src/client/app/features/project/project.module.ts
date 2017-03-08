/** Angular Dependencies */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/** Module level Dependencies */
import { CommonModule } from '../core/index';
import { ManageProjectComponent } from './components/manage-project/manage-project.component';
import { AddEditProjectComponent } from './components/add-edit-project/add-edit-project.component';

/** Service Declarations */
import { ProjectService, TeamMemberService, PhasesService } from './services/index';
import { ClientService } from '../core/shared/services/master/client.service';
import { ProjectTypeService } from '../core/shared/services/master/projectType.service';
import { ProjectCategoryService } from '../core/shared/services/master/projectCategory.service';
import { PriceTypeService } from '../core/shared/services/master/priceType.service';
import { DeliveryModelService } from '../core/shared/services/master/deliveryModel.service';
import { DeliveryUnitService } from '../core/shared/services/master/deliveryUnit.service';

/** Module Definition */
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [
        ManageProjectComponent,
        AddEditProjectComponent
    ],
    providers: [
        ProjectService, ClientService, ProjectTypeService, TeamMemberService, PhasesService,
        ProjectCategoryService, PriceTypeService, DeliveryModelService, DeliveryUnitService
    ]
})
export class ProjectModule {
}
