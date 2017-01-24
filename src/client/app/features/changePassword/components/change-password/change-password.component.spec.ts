// angular
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { t } from '../../../../frameworks/test/index';
import { CoreModule } from '../../../../frameworks/core/core.module';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { ChangePasswordService } from '../../services/change-password.service';
import { ChangePassword } from '../../models/changePassword';
import { MessageService } from '../../../core/shared/services/message.service';
// app
import { ChangePasswordComponent } from './change-password.component';

export function main() {

    t.describe('Component: ChangePasswordComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoreModule, FormsModule, ReactiveFormsModule],
                declarations: [ChangePasswordComponent, TestComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    FormBuilder,
                    { provide: Router, useClass: RouterStub },
                    { provide: ChangePasswordService, useClass: ChangePasswordServiceStub },
                    { provide: MessageService, useclass: MessageServiceStub }
                ]
            });
        });

        t.it('should have a defined ChangePasswordComponent',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.e(fixture.nativeElement).toBeTruthy();
                        t.e(TestComponent).toBeDefined();
                    });
            }));

    });
}


@Component({
    selector: 'test-cmp',
    template: '<change-password-component></change-password-component>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { return url; }
}

class ChangePasswordServiceStub {
    changePasswordDummy = {
        OldPassword: 'password',
        NewPassword: 'qwerty',
        ConfirmPassword: 'qwerty'
    };
    changePassword(param) {
        return true;
    }
}

class MessageServiceStub {
    addMessage(message) {
        return;
    }
}
