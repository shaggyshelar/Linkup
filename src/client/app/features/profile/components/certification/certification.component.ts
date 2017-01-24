/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { CertificateService } from '../../services/certificate.service';
import { Certificate } from '../../models/certificate';
import { CertificationFormValidation } from '../../models/validation/certificationFormValidation';
import { MessageService } from '../../../core/shared/services/message.service';
import { CertificationMasterService } from '../../../core/shared/services/master/certificationMaster.service';
import { CertificationCodeMasterService } from '../../../core/shared/services/master/certificationCodeMaster.service';

/** Third Party Dependencies */
import { SelectItem } from 'primeng/primeng';

/** Other Module Dependencies */
import * as _ from 'lodash/lodash';
import * as moment from 'moment/moment';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'certification',
    templateUrl: 'certification.component.html',
    styleUrls: ['certification.component.css']
})
export class CertificationComponent implements OnInit {
    public certifications: Observable<Certificate>;
    public certificationOptionsMaster: Observable<any>;
    public certificationCodesMaster: Observable<any>;
    certificationOptions: SelectItem[];
    certificationCodes: SelectItem[];
    showDiv: boolean;
    certificationForm: FormGroup;
    public profile_Observable: Observable<any>;

    constructor(private formBuilder: FormBuilder, private certificateService: CertificateService, private messageService: MessageService,
        private certificationMasterService: CertificationMasterService, private certificationCodeMasterService: CertificationCodeMasterService) {
        this.certificationOptions = [];
        this.certificationCodes = [];
        this.showDiv = true;
    }

    ngOnInit(): void {
        this.certificationOptionsMaster = this.certificationMasterService.getCertificationMaster();
        this.certificationOptionsMaster.subscribe(result => {
            if (result) {
                this.certificationOptions.push({ label: 'Select', value: null }),
                    result.forEach(element => {
                        this.certificationOptions.push({
                            label: element.Name,
                            value: {
                                id: element.ID,
                                name: element.Name
                            }
                        })
                    });
            }
        })

        this.certificationCodesMaster = this.certificationCodeMasterService.getCertificationCodeMaster();
        this.certificationCodesMaster.subscribe(result => {
            if (result) {
                this.certificationCodes.push({ label: 'Select', value: null }),
                    result.forEach(element => {
                        this.certificationCodes.push({
                            label: element.Name,
                            value: {
                                id: element.ID,
                                name: element.Name
                            }
                        })
                    });
            }
        })

        this.certificationForm = this.formBuilder.group({
            id: [null],
            option: ['', [Validators.required]],
            code: [''],
            fromEspl: [''],
            date: ['', [Validators.required]],
        });

        this.certifications = this.certificateService.getCertificates();
    }

    onAddClick() {
        this.showDiv = false;
        this.certificationForm.reset();
    }
    onSubmit({ value, valid }: { value: CertificationFormValidation, valid: boolean }) {
        if (value.id) {
            let params = {
                ID: value.id,
                Name: value.option.name,
                Code: value.code.name,
                Date: moment(value.date).format('DD/MM/YYYY'),
                FilePath: '',
                FromESPL: value.fromEspl
            };
            this.certificateService.updateCertificate(value.id, params).subscribe(res => {
                if (res) {
                    this.certifications = this.certificateService.getCertificates();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Certificate Information updated successfully.' });
                    this.showDiv = true;
                }
            });
        } else {
            let params = {
                Name: value.option.name,
                Code: value.code && value.code.name ? value.code.name : '',
                Date: moment(value.date).format('DD/MM/YYYY'),
                FilePath: '',
                FromESPL: value.fromEspl
            };
            this.certificateService.addCertificate(params).subscribe(res => {
                if (res) {
                    this.certifications = this.certificateService.getCertificates();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Certificate Information saved successfully.' });
                    this.showDiv = true;
                }
            });
        }
    }

    cancel() {
        this.showDiv = true;
        this.certificationForm.reset();
    }

    selectCertification(certificationData) {
        this.showDiv = false;
        var date = certificationData.Date.split('/');
        this.certificationForm.setValue({
            id: certificationData.ID,
            option: _.find(this.certificationOptions, ['label', certificationData.Name]) ? _.find(this.certificationOptions, ['label', certificationData.Name]).value : '',
            code: _.find(this.certificationCodes, ['label', certificationData.Code]) ? _.find(this.certificationCodes, ['label', certificationData.Code]).value : '',
            date: new Date(date[2] + '-' + date[1] + '-' + date[0]),
            fromEspl: certificationData.FromESPL,
        });
    }
}
