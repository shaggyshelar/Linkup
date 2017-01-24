/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';


/** Module Level Dependencies */
import { EducationService } from '../../services/education.service';
import { Education } from '../../models/education';
import { MessageService } from '../../../core/shared/services/message.service';
import { EducationFormValidation } from '../../models/validation/educationFormValidation';
import { ClassMasterService } from '../../../core/shared/services/master/classMaster.service';
import { GradeMasterService } from '../../../core/shared/services/master/gradeMaster.service';

/** Third Party Dependencies */
import { SelectItem } from 'primeng/primeng';


/** Other Module Dependencies */
import * as _ from 'lodash/lodash';

export interface Select {
    id: number;
    name: string;
};




/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'education',
    templateUrl: 'education.component.html',
    styleUrls: ['education.component.css']
})
export class EducationComponent implements OnInit {
    education: Observable<Education>;
    public classMaster: Observable<any>;
    public gradeMaster: Observable<any>;
    class: SelectItem[];
    grade: SelectItem[];
    showDiv: boolean;
    educationForm: FormGroup;
    public profile_Observable: Observable<any>;

    constructor(
        private router: Router, private formBuilder: FormBuilder, private educationService: EducationService, private messageService: MessageService,
        private classMasterService: ClassMasterService, private gradeMasterService: GradeMasterService) {
        this.class = [];
        this.grade = [];
        this.showDiv = true;
    }

    ngOnInit(): void {
        this.classMaster = this.classMasterService.getClassMaster();
        this.classMaster.subscribe(result => {
            if (result) {
                this.class.push({ label: 'Select', value: null }),
                    result.forEach(element => {
                        this.class.push({
                            label: element.Name,
                            value: {
                                id: element.ID,
                                name: element.Name
                            }
                        })
                    });
            }
        })

        this.gradeMaster = this.gradeMasterService.getGradeMaster();
        this.gradeMaster.subscribe(result => {
            if (result) {
                this.grade.push({ label: 'Select', value: null }),
                    result.forEach(element => {
                        this.grade.push({
                            label: element.Name,
                            value: {
                                id: element.ID,
                                name: element.Name
                            }
                        })
                    });
            }
        })

        this.education = this.educationService.getEducation();

        this.educationForm = this.formBuilder.group({
            id: [''],
            degree: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
            class: ['', [Validators.required]],
            grade: ['', [Validators.required]],
            percentage: ['', [Validators.required, Validators.pattern('^[1-9][0-9]?$|^100$')]],
            yearOfPassing: ['', [Validators.required, Validators.pattern('(?:(?:19|20)[0-9]{2})')]]
        });
    }

    onSubmit({ value, valid }: { value: EducationFormValidation, valid: boolean }) {
        if (value.id) {
            let params = {
                ID: value.id,
                Name: value.class.name,
                Degree: value.degree,
                Grade: value.grade.name,
                Percentage: value.percentage,
                YearOfPassing: value.yearOfPassing
            };
            this.educationService.updateEducation(value.id, params).subscribe(res => {
                if (res) {
                    this.education = this.educationService.getEducation();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Education Information updated successfully.' });
                    this.showDiv = true;
                }
            });
        } else {
            let params = {
                Name: value.class.name,
                Degree: value.degree,
                Grade: value.grade.name,
                Percentage: value.percentage,
                YearOfPassing: value.yearOfPassing
            };
            this.educationService.addEducation(params).subscribe(res => {
                if (res) {
                    this.education = this.educationService.getEducation();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Education Information saved successfully.' });
                    this.showDiv = true;
                }
            });
        }
    }

    onFileSelect(event) {
        console.log('event', event);
    }

    onAddClick() {
        this.showDiv = false;
        this.educationForm.reset();
    }

    cancel() {
        this.showDiv = true;
        this.educationForm.reset();
    }
    editEducation(educationData) {
        this.showDiv = false;
        this.educationForm.setValue({
            id: educationData.ID,
            degree: educationData.Degree,
            class: _.find(this.class, ['label', educationData.Class.Name]) ? _.find(this.class, ['label', educationData.Class.Name]).value : '',
            grade: _.find(this.grade, ['label', educationData.Grade]) ? _.find(this.grade, ['label', educationData.Grade]).value : '',
            yearOfPassing: educationData.YearOfPassing,
            percentage: educationData.Percentage
        });
    }

    onChange(event) {
        var files = event.srcElement.files;
    }
}
