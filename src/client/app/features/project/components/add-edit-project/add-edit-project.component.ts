/** Angular Dependencies */
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
/** Third Party Dependencies */
import { SelectItem } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment/moment';
import * as _ from 'lodash/index';
/** Module Level Dependencies */
import { Project } from '../../models/project';
import { ProjectService, TeamMemberService } from '../../services/index';
import { ProjectTypeService } from '../../../core/shared/services/master/projectType.service';
import { PriceTypeService } from '../../../core/shared/services/master/priceType.service';
import { DeliveryUnitService,
         DeliveryModelService, ProjectCategoryService, MessageService,
         ClientService } from '../../../core/shared/index';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'add-edit-component',
    templateUrl: 'add-edit-project.component.html'
})

export class AddEditProjectComponent implements OnInit {
    projectForm: FormGroup;
    params: Params;
    billTypes: SelectItem[];
    clients: SelectItem[];
    projectType: SelectItem[];
    deliverModels: SelectItem[];
    deliverUnits: SelectItem[];
    priceType: SelectItem[];
    projectCategory: SelectItem[];
    teamMember: any;
    filteredMemberList: any;
    selectedTeamMember: Object;
    constructor(
        private projectService: ProjectService,
        private teamMemberService: TeamMemberService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private projectTypeService: ProjectTypeService,
        private clientService: ClientService,
        private DeliveryUnitService: DeliveryUnitService,
        private DeliveryModelService: DeliveryModelService,
        private PriceTypeService: PriceTypeService,
        private ProjectCategoryService: ProjectCategoryService,
    ) { }

    ngOnInit() {
        this.teamMember = [];
        this.billTypes = [];
        this.clients = [];
        this.projectType = [];
        this.deliverModels = [];
        this.deliverUnits = [];
        this.priceType = [];
        this.projectCategory = [];
        this.projectType.push({ label: 'Select Project Type', value: null });
        this.projectType.push({ label: 'Administration', value: 'Administration' });
        this.projectType.push({ label: 'Internal', value: 'Internal' });
        this.projectType.push({ label: 'External', value: 'External' });
        this.DeliveryModelService.getDeliveryModelList().subscribe(result => {
            this.deliverModels.push({ label: 'Select Delivery Model', value: null });
            _.forEach(result, (element: any) => {
                this.deliverModels.push({
                    label: element.Title,
                    value:{Value:element.Title ,ID:element.ID}
                });
            });
        });
        this.DeliveryUnitService.getDeliveryUnitList().subscribe(result => {
            this.deliverUnits.push({ label: 'Select Delivery Unit', value: null });
            _.forEach(result, (element: any) => {
                this.deliverUnits.push({
                    label: element.Title,
                    value:{Value:element.Title ,ID:element.ID}
                });
            });
        });
        // this.PriceTypeService.getPriceType().subscribe(result => {
        //     this.priceType.push({ label: 'Select Price Type', value: null });
        //     _.forEach(result, (element:any) => {
        //         this.priceType.push({
        //             label: element.Title,
        //             value: element.Title
        //         });
        //     });
        // });
        this.ProjectCategoryService.getProjectCategories().subscribe(result => {
            this.projectCategory.push({ label: 'Select Project Category', value: null });
            _.forEach(result, (element: any) => {
                this.projectCategory.push({
                    label: element.Category,
                    value:{Value:element.Category ,ID:element.ID}
                });
            });
        });
        this.clientService.getClients().subscribe(result => {
            this.clients.push({ label: 'Select Client', value: null });
            _.forEach(result, (element:any) => {
                this.clients.push({
                    label: element.ClientName,
                    value: {Value:element.ClientName ,ID:element.ID}
                });
            });
        });

        this.billTypes = [{ label: 'Select ', value: null }, {
            label: 'Billable',
            value: 'Billable'
        }, {
            label: 'Non-Billable',
            value: 'Non-Billable'
        }];
        this.projectForm = this.formBuilder.group({
            Id: [null],
            ProjectName: ['', [Validators.required]],
            ProjectType: ['', [Validators.required]],
            DeliveryUnit: ['', [Validators.required]],
            ProjectCategory: ['', [Validators.required]],
            ClientName: ['', [Validators.required]],
            ProjectStartDate: ['', [Validators.required]],
            ProjectEndDate: ['', [Validators.required]],
            ProjectManager: ['', [Validators.required]],
            AccountManager: ['', [Validators.required]],
            DeliveryManager: ['', [Validators.required]],
            BillableNonBillable: ['', [Validators.required]],
            ProjectSummary: [''],
            DeliveryModel: ['', [Validators.required]],
            PriceType: ['', [Validators.required]],
            TeamSize: [''],
            IsActive: [false],
            IsGlobal: [false]
        });
        this.route.params.forEach((params: Params) => {
            if (params['id']) {
                this.params = params['id'];
                this.projectService.getProjectById(this.params.toString()).subscribe((result: any) => {
                    if (result) {
                        this.teamMember = [];
                        this.projectForm.setValue({
                            Id: result.ID,
                            ProjectName: result.Title,
                            ProjectType: result.ProjectType,
                            DeliveryUnit: result.DeliveryUnit,
                            ProjectCategory: result.ProjectCategory,
                            ClientName: result.ClientName,
                            ProjectStartDate: new Date(result.StartDate),
                            ProjectEndDate: new Date(result.EndDate),
                            ProjectManager: result.ProjectManager.Name,
                            AccountManager: result.AccountManager.Name,
                            DeliveryManager: result.DeliveryManager.Name,
                            BillableNonBillable: result.BillableNonBillable,
                            ProjectSummary: result.ProjectSummary,
                            DeliveryModel: result.DeliveryModel,
                            PriceType: result.PriceType,
                            TeamSize: result.TeamSize,
                            IsActive: result.Active,
                            IsGlobal: result.Isglobal
                        });
                        this.teamMemberService.getTeamByProject(result.ProjectMasterID).subscribe((result: any) => {
                            this.teamMember = result;
                        });
                    }
                });
            }
        });
    }

    onSubmit({ value, valid }: { value: Project, valid: boolean }) {
        //value.ProjectStartDate = moment(value.ProjectStartDate).format('DD-MM-YYYY');
        //value.ProjectEndDate = moment(value.ProjectEndDate).format('DD-MM-YYYY');
        value.TeamMembers = this.teamMember;
        if (this.params) {
            this.projectService.editProject(value).subscribe(result => {
                if (result) {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Project Updated' });
                    this.router.navigate(['/project/manage']);
                }
            });
        } else {
            this.projectService.saveProject(value).subscribe(result => {
                if (result) {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Project Saved' });
                    this.router.navigate(['/project/manage']);
                }
            });
        }
    }

    onCancel() {
        this.router.navigate(['/project/manage']);
    }
    onDeleteMember(index: number) {
        this.teamMember.splice(index, 1);
    }
    onTeamMemberSelect(item: any) {
        this.selectedTeamMember = item;
    }
    onAddTeamMember() {
        this.teamMember.push(this.selectedTeamMember);
        this.selectedTeamMember = '';
    }
    filterTeamMember() {
        this.filteredMemberList = [
            { Id: 1, Name: 'Salauddin' },
            { Id: 2, Name: 'Sachin' },
            { Id: 3, Name: 'Aman' }];
    }
}
