/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { Nominee } from '../../../models/nominee';
import { MessageService } from '../../../../core/shared/services/message.service';
import { NomineesService } from '../../../services/nominees.service';
import { NomineeFormValidation } from '../../../models/validation/nomineeFormValidation';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'profile-detail-nominees',
    templateUrl: 'nominees.component.html',
    styleUrls: ['nominees.component.css']
})
export class NomineesComponent implements OnInit {
    nomineesList: any;
    showDiv: boolean;
    public profile_Observable: Observable<any>;
    nomineeForm: FormGroup;
    nomineesData: Observable<Nominee>;;

    constructor(private messageService: MessageService, private formBuilder: FormBuilder, private nomineesService: NomineesService) {
        this.nomineesList = [];
        this.showDiv = true;
    }
    ngOnInit(): void {

        this.nomineeForm = this.formBuilder.group({
            id: null,
            firstNomineeName: ['', [Validators.required]],
            firstNomineeRelationWithEmp: ['', [Validators.required]],
            secondNomineeName: ['', [Validators.required]],
            secondNomineeRelationWithEmp: ['', [Validators.required]],
            isDeclaration: false
        });

        this.nomineesData = this.nomineesService.getNominees();
        this.nomineesData.subscribe(result => {
            this.nomineesList = result ? result : [];
        });
    }
    onSubmit({ value, valid }: { value: NomineeFormValidation, valid: boolean }) {
        if (value.id) {
            let params = {
                ID: value.id,
                FirstNomineeName: value.firstNomineeName,
                FirstNomineeRelationWithEmp: value.firstNomineeRelationWithEmp,
                SecondNomineeName: value.secondNomineeName,
                SecondNomineeRelationWithEmp: value.secondNomineeRelationWithEmp,
                IsDeclaration: value.isDeclaration
            };
            this.nomineesService.updateNominee(value.id, params).subscribe(res => {
                if (res) {
                    this.nomineesData = this.nomineesService.getNominees();
                    this.nomineesData.subscribe(result => {
                        this.nomineesList = result ? result : [];
                    });
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Nominees updated successfully.' });
                    this.showDiv = true;
                }
            });
        } else {
            let params = {
                FirstNomineeName: value.firstNomineeName,
                FirstNomineeRelationWithEmp: value.firstNomineeRelationWithEmp,
                SecondNomineeName: value.secondNomineeName,
                SecondNomineeRelationWithEmp: value.secondNomineeRelationWithEmp,
                IsDeclaration: value.isDeclaration
            };
            this.nomineesService.addNominee(params).subscribe(res => {
                if (res) {
                    this.nomineesData = this.nomineesService.getNominees();
                    this.nomineesData.subscribe(result => {
                        this.nomineesList = result ? result : [];
                    });
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Nominees saved successfully.' });
                    this.showDiv = true;
                }
            });
        }
    }
    cancel() {
        this.showDiv = true;
    }

    add() {
        this.showDiv = false;
        if (this.nomineesList.length > 0) {
            this.nomineeForm.setValue({
                id: this.nomineesList[0].ID,
                firstNomineeName: this.nomineesList[0].FirstNomineeName,
                firstNomineeRelationWithEmp: this.nomineesList[0].FirstNomineeRelationWithEmp,
                secondNomineeName: this.nomineesList[0].SecondNomineeName,
                secondNomineeRelationWithEmp: this.nomineesList[0].SecondNomineeRelationWithEmp,
                isDeclaration: this.nomineesList[0].IsDeclaration ? this.nomineesList[0].IsDeclaration : false
            });
        }
    }
}
