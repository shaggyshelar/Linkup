/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { EmploymentHistoryService } from '../../services/employmentHistory.service';
import { EmploymentHistory } from '../../models/employmentHistory';
import { MessageService } from '../../../core/shared/services/message.service';
import { EmploymentHistoryFormValidation } from '../../models/validation/employmentHistoryFormValidation';

/** Other Module Dependencies */
import * as moment from 'moment/moment';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'employment-history',
    templateUrl: 'employment-history.component.html',
    styleUrls: ['employment-history.component.css']
})
export class EmploymentHistoryComponent implements OnInit {
    public employmentHistory: Observable<EmploymentHistory>;
    lastEmployerDetails: any[];
    showDiv: boolean;
    showEmployerDiv: boolean;
    employmentHistoryForm: FormGroup;
    public profile_Observable: Observable<any>;

    constructor(private formBuilder: FormBuilder, private employmentHistoryService: EmploymentHistoryService, private messageService: MessageService) {
        this.lastEmployerDetails = [];
        this.showDiv = true;
        this.showEmployerDiv = true;
    }

    ngOnInit(): void {
        this.employmentHistory = this.employmentHistoryService.getEmploymentHistory();

        this.employmentHistoryForm = this.formBuilder.group({
            id: [''],
            employementDetails: ['', [Validators.required]],
            designation: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]]
        });
    }

    onAddClick() {
        this.showDiv = false;
        this.employmentHistoryForm.reset();
    }

    onSubmit({ value, valid }: { value: EmploymentHistoryFormValidation, valid: boolean }) {

        if (value.id) {
            let params = {
                ID: value.id,
                EmploymentDetail: value.employementDetails,
                Designation: value.designation,
                StartDate: moment(value.startDate).format('DD/MM/YYYY'),
                EndDate: moment(value.endDate).format('DD/MM/YYYY')
            };
            this.employmentHistoryService.updateEmploymentHistory(value.id, params).subscribe(res => {
                if (res) {
                    this.employmentHistory = this.employmentHistoryService.getEmploymentHistory();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Employment History updated successfully.' });
                    this.showDiv = true;
                }
            });
        } else {
            let params = {
                EmploymentDetail: value.employementDetails,
                Designation: value.designation,
                StartDate: moment(value.startDate).format('DD/MM/YYYY'),
                EndDate: moment(value.endDate).format('DD/MM/YYYY')
            };
            this.employmentHistoryService.addEmploymentHistory(params).subscribe(res => {
                if (res) {
                    this.employmentHistory = this.employmentHistoryService.getEmploymentHistory();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Employment History saved successfully.' });
                    this.showDiv = true;
                }
            });
        }
    }

    cancel() {
        this.showDiv = true;
        this.employmentHistoryForm.reset();
    }

    addLastEmployer() {
        this.showEmployerDiv = false;
        this.employmentHistoryForm.reset();
    }

    submitLastEmployer() {
        this.lastEmployerDetails = [{
            id: 1,
            firstMonth: '',
            secondMonth: '',
            thirdDate: '',
            expLetterOne: '',
            expLetterSecond: '',
            status: 'pending for approval',
            hrComments: ''
        }];
        this.showEmployerDiv = true;
    }
    cancelLastEmployer() {
        this.showEmployerDiv = true;
    }
    editEmploymentHistory(employmentHistoryData) {
        this.showDiv = false;
        var startDate = employmentHistoryData.StartDate.split('/');
        var endDate = employmentHistoryData.EndDate.split('/');
        this.employmentHistoryForm.setValue({
            id: employmentHistoryData.ID,
            employementDetails: employmentHistoryData.EmploymentDetail,
            designation: employmentHistoryData.Designation,
            startDate: new Date(startDate[2] + '-' + startDate[1] + '-' + startDate[0]),
            endDate: new Date(endDate[2] + '-' + endDate[1] + '-' + endDate[0])
        });
    }
}
