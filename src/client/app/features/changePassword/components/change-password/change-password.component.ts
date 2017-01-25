/** Angular Dependencies */
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';

import { Component } from '@angular/core';

/** Module Level Dependencies */
import { ChangePasswordService } from '../../services/change-password.service';
import { ChangePassword } from '../../models/changePassword';
import { PasswordForm } from '../../models/passwordFormValidation';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/services/message.service';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { Message } from 'primeng/primeng';

/** Component Declaration */



@Component({
    moduleId: module.id,
    selector: 'change-password-component',
    templateUrl: 'change-password.component.html',
    styleUrls: ['change-password.component.css']
})

export class ChangePasswordComponent {
    passwrdObs: Observable<any>;
    passwordForm: FormGroup;

    isFormClean: boolean = false;
    isConfirmPasswordSame:boolean;

    constructor(
        private messageService: MessageService,
        private passwordService: ChangePasswordService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.passwordForm = this.formBuilder.group({
            OldPassword: ['', [Validators.required]],
            NewPassword: ['', [Validators.required, Validators.minLength(7)]],
            ConfirmPassword: ['', [Validators.required, Validators.minLength(7)]]
        });
    }


    onSubmit({ value, valid }: { value: PasswordForm, valid: boolean }) {
        var params = {
            NewPassword: value.NewPassword,
            OldPassword: value.OldPassword,
            ConfirmPassword: value.ConfirmPassword
        };

        if (params.ConfirmPassword === params.NewPassword) {
            this.isConfirmPasswordSame = true;
            this.passwrdObs = this.passwordService.changePassword(params);
            this.passwrdObs.subscribe(res => {
                if (res.resp === 1) {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Password Changed!' });
                    this.passwordForm.reset();
                } else {
                    this.messageService.addMessage({ severity: 'error', summary: 'Failed', detail: res.message });
                    this.passwordForm.reset();
                }
            })
        } else {
            this.isConfirmPasswordSame = false;
        }
    }
}
