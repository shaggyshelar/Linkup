import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CacheService, CacheStorageAbstract, CacheLocalStorage } from 'ng2-cache/ng2-cache';
import {
    ScheduleModule, DataTableModule, SharedModule, ButtonModule, InputTextareaModule, CalendarModule,
    DropdownModule, DialogModule, ConfirmDialogModule, GrowlModule, ConfirmationService,
    ProgressBarModule, CheckboxModule, FileUploadModule, AutoCompleteModule
} from 'primeng/primeng';
import { IfAuthorizeDirective } from './directives/ifAuthorize.directive';
import { UnauthorizedAccessComponent } from '../errorPages/unauthorizedAccess/unauthorizedAccess.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from './services/message.service';

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
    FileUploadModule,
    AutoCompleteModule
];

/**
 * Imports Declaration
 */
let imports = [
    RouterModule,
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule];

/**  Exported components declaration   */
let exportComponents = [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    IfAuthorizeDirective,
    UnauthorizedAccessComponent,
    ...primeNgComponents
];


/**
 * Components/ Directives declaration
 */
let declarations = [
    IfAuthorizeDirective,
    UnauthorizedAccessComponent
];

/**
 * Providers Declaration
 */
let providers = [
    ConfirmationService,
    MessageService,
    CacheService,
    { provide: CacheStorageAbstract, useClass: CacheLocalStorage }];

/** Module Definition */
@NgModule({
    imports,
    exports: exportComponents,
    declarations,
    providers,
})
export class CommonModule { }

