/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { Passport } from '../../../models/passport';
import { PassportService } from '../../../services/passport.service';
import { MessageService } from '../../../../core/shared/services/message.service';
import { PassportFormValidation } from '../../../models/validation/passportFormValidation';

/** Other Module Dependencies */
import * as moment from 'moment/moment';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'passport',
    templateUrl: 'passport.component.html',
    styleUrls: ['passport.component.css']
})
export class PassportComponent implements OnInit {

    passport: Observable<Passport>;
    showDiv: boolean;
    passportForm: FormGroup;
    public profile_Observable: Observable<any>;
    passportList: any;

    constructor(private formBuilder: FormBuilder, private passportService: PassportService, private messageService: MessageService) {
        this.showDiv = true;
        this.passportList = [];
    }

    ngOnInit(): void {
        this.passportForm = this.formBuilder.group({
            id: null,
            number: ['', [Validators.required]],
            expiryDate: ['', [Validators.required]]
        });

        this.passport = this.passportService.getPassport();
        this.passport.subscribe(result => {
            this.passportList = result ? result : [];
        });
    }

    addClick(passport) {
        this.showDiv = false;
        if (this.passportList && this.passportList.length > 0) {
            var expiryDate = this.passportList[0].ExpDate.split('/');
            this.passportForm.setValue({
                id: this.passportList[0].ID,
                number: this.passportList[0].Number,
                expiryDate: new Date(expiryDate[2] + '-' + expiryDate[1] + '-' + expiryDate[0]),
            });
        }
    }

    onSubmit({ value, valid }: { value: PassportFormValidation, valid: boolean }) {
        this.showDiv = true;
        if (value.id) {
            let params = {
                ID: value.id,
                Number: value.number,
                ExpDate: moment(value.expiryDate).format('DD/MM/YYYY')
            };
            this.passportService.updatePassport(value.id, params).subscribe(res => {
                if (res) {
                    this.passport = this.passportService.getPassport();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Passport Information updated successfully.' });
                    this.showDiv = true;
                }
            });
        } else {
            let params = {
                Number: value.number,
                ExpDate: moment(value.expiryDate).format('DD/MM/YYYY')
            };
            this.passportService.addPassport(params).subscribe(res => {
                if (res) {
                    this.passport = this.passportService.getPassport();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Passport Information saved successfully.' });
                    this.showDiv = true;
                }
            });
        }
    }

    cancel() {
        this.showDiv = true;
        this.passportForm.reset();
    }
}
