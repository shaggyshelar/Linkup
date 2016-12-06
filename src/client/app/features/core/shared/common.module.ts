import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScheduleModule, DataTableModule, SharedModule, ButtonModule, InputTextareaModule, CalendarModule, DropdownModule, DialogModule, ConfirmDialogModule, GrowlModule, ConfirmationService, ProgressBarModule, CheckboxModule, FileUploadModule } from 'primeng/primeng';
import { LoginService } from './services/login.service';
import { IfAuthorize } from './directives/ifAuthorize.directive';
import { UnauthorizedAccessComponent } from '../errorPages/unauthorizedAccess/unauthorizedAccess.component';

let primeNgComponents = [
    ScheduleModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    InputTextareaModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    ConfirmDialogModule,
    GrowlModule,
    ProgressBarModule,
    CheckboxModule,
    FileUploadModule
];

/**
 * Imports Declaration
 */
let imports = [
    RouterModule,
    AngularCommonModule];

/**  Exported components declaration   */
let exportComponents = [
    RouterModule,
    AngularCommonModule,
    IfAuthorize,
    UnauthorizedAccessComponent,
    ...primeNgComponents
];

/**
 * Components/ Directives declaration
 */
let declarations = [
    IfAuthorize,
    UnauthorizedAccessComponent
];

/**
 * Providers Declaration
 */
let providers = [LoginService, ConfirmationService];

/** Module Definition */
@NgModule({
    imports,
    exports: exportComponents,
    declarations,
    providers,
})
export class CommonModule { }

