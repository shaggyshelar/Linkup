/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { IdentityProofService } from '../../../services/identityProof.service';
import { IdentityProof } from '../../../models/identityProof';
import { MessageService } from '../../../../core/shared/services/message.service';
import { IdentityProofsFormValidation } from '../../../models/validation/identityProofsFormValidation';
import { IdentityTypeMasterService } from '../../../../core/shared/services/master/identityTypeMaster.service';

/** Third Party Dependencies */
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash/index';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'identity-proofs',
    templateUrl: 'identity-proofs.component.html',
    styleUrls: ['identity-proofs.component.css']
})
export class IdentityProofsComponent implements OnInit {

    identityProofs: Observable<IdentityProof>;
    identityTypesMaster: Observable<any>;
    identityTypes: SelectItem[];
    showDiv: boolean;
    showSubDiv: boolean;
    selectedIdentityType: any;
    public profile_Observable: Observable<any>;
    identityProofForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private identityProofService: IdentityProofService, private messageService: MessageService,
        private identityTypeMasterService: IdentityTypeMasterService) {
        this.showDiv = false;
        this.showSubDiv = false;
        this.selectedIdentityType = {};
        this.identityTypes = [];
    }

    ngOnInit(): void {
        this.identityTypesMaster = this.identityTypeMasterService.getIdentityTypeMaster();
        this.identityTypesMaster.subscribe(result => {
            if (result) {
                this.identityTypes.push({ label: 'Select', value: null }),
                    result.forEach((element:any) => {
                        this.identityTypes.push({
                            label: element.Name,
                            value: {
                                id: element.ID,
                                name: element.Name
                            }
                        })
                    });
            }
        })

        this.identityProofForm = this.formBuilder.group({
            id: null,
            value: ['', [Validators.required]]
        });

        this.identityProofs = this.identityProofService.getIdentityProof();

    }
    addClick() {
        this.showDiv = true;
        this.selectedIdentityType = {};
        this.identityProofForm.reset();
    }

    onSubmit({ value, valid }: { value: IdentityProofsFormValidation, valid: boolean }) {

        if (value.id) {
            let params = {
                ID: value.id,
                Type: this.selectedIdentityType.name,
                Value: value.value,
            };
            this.identityProofService.updateIdentityProof(value.id, params).subscribe(res => {
                if (res) {
                    this.identityProofs = this.identityProofService.getIdentityProof();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Identity Proof updated successfully.' });
                    this.showDiv = false;
                    this.showSubDiv = false;
                }
            });
        } else {
            let params = {
                Type: this.selectedIdentityType.name,
                Value: value.value,
            };
            this.identityProofService.addIdentityProof(params).subscribe(res => {
                if (res) {
                    this.identityProofs = this.identityProofService.getIdentityProof();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Identity Proof saved successfully.' });
                    this.showDiv = false;
                    this.showSubDiv = false;
                }
            });
        }
    }
    cancel() {
        this.showSubDiv = false;
        this.selectedIdentityType = {};
        this.identityProofForm.reset();
    }
    cancelIdentityType() {
        this.showSubDiv = false;
        this.showDiv = false;
        this.selectedIdentityType = {};
        this.identityProofForm.reset();
    }
    onIdentityTypeChange(event:any) {
        this.showSubDiv = true;
    }

    editIdentityProof(identity:any) {
        this.showDiv = false;
        this.showSubDiv = true;
        var typeIndex = _.findIndex(this.identityTypes, { label: identity.Type.Name });
        this.selectedIdentityType = this.identityTypes[typeIndex].value;
        this.identityProofForm.setValue({
            id: identity.ID,
            value: identity.Value
        })
    }
}
