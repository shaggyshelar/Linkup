/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Third Party Dependencies */
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash/lodash';
/** Module Level Dependencies */
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket.service';
import { MessageService } from '../../../../core/shared/services/message.service';
import { ConcernService } from '../../../../core/shared/services/master/concern.service';
import { DepartmentService } from '../../../../core/shared/services/master/department.service';
import { PriorityService } from '../../../../core/shared/services/master/priority.service';

/** Third Party Dependencies */

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'manage-ticket',
    templateUrl: 'manage-ticket.component.html'
})
export class ManageTicketComponent implements OnInit {
    departments: SelectItem[];
    priorities: SelectItem[];
    concerns: SelectItem[];
    params: Params;
    ticketForm: FormGroup;
    constructor(
        private concernService: ConcernService,
        private departmentService: DepartmentService,
        private priorityService: PriorityService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private ticketService: TicketService,
        private route: ActivatedRoute,
        private router: Router) {
    }
    ngOnInit(): void {
        this.ticketForm = this.formBuilder.group({
            Id: [null],
            Department: ['', [Validators.required]],
            Priority: ['', [Validators.required]],
            Concern: ['', [Validators.required]],
            Description: ['', [Validators.required]],
        });
        this.concernService.getConcernList().subscribe(result => {
            this.concerns = [];
            this.concerns.push({ label: 'Select Concerns', value: null });
            _.forEach(result, (element:any) => {
                this.concerns.push({
                    label: element.Name,
                    value: element.Name
                });
            });
        });
        this.departmentService.getDepartmentList().subscribe(result => {
            this.departments = [];
            this.departments.push({ label: 'Select Department', value: null });
            _.forEach(result, (element:any) => {
                this.departments.push({
                    label: element.Name,
                    value: element.Name
                });
            });
        });
        this.priorityService.getPriorityList().subscribe(result => {
            this.priorities = [];
            this.priorities.push({ label: 'Select Priority', value: null });
            _.forEach(result, (element:any) => {
                this.priorities.push({
                    label: element.Name,
                    value: element.Name
                });
            });
        });

        this.route.params.forEach((params: Params) => {
            if (params['id']) {
                this.params = params['id'];
                this.ticketService.getTicketById(this.params.toString()).subscribe((result:any) => {
                    if (result) {
                        this.ticketForm.setValue({
                            Id: result.Id,
                            Department: result.Department,
                            Priority: result.Priority,
                            Concern: result.Concern,
                            Description: result.Description,
                        });
                    }
                });
            }
        });
    }

    onSubmit({ value, valid }: { value: Ticket, valid: boolean }) {
        if (this.params) {
            this.ticketService.editTicket(value).subscribe(result => {
                if (result) {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Ticket Edit' });
                    this.router.navigate(['/corporate/log-ticket']);
                }
            });
        } else {
            this.ticketService.saveTicket(value).subscribe(result => {
                if (result) {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Ticket Logged' });
                    this.router.navigate(['/corporate/log-ticket']);
                }
            });
        }
    }

    cancel() {
        this.router.navigate(['/corporate/log-ticket']);
    }
}
