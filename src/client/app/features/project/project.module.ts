/** Angular Dependencies */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/** Module level Dependencies */
import { CommonModule } from '../core/index';
import { ManageProjectComponent } from './components/manage-project/manage-project.component';

/** Service Declarations */
import { ProjectService } from './services/project.service';

/** Module Definition */
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [
        ManageProjectComponent
    ],
    providers: [ProjectService]
})
export class ProjectModule {
}
