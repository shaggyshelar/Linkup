// angular
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { t } from '../../../../frameworks/test/index';
import { CoreModule } from '../../../../frameworks/core/core.module';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

import { MessageService } from '../../../core/shared/services/message.service';
import { Observable } from 'rxjs/Rx';
import { LeaveService } from '../../services/leave.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { LeaveTypeMasterService } from '../../../core/shared/services/master/leaveTypeMaster.service';
// app
import { ApplyLeaveComponent } from './apply-leave.component';

export function main() {

    t.describe('Component: ApplyLeaveComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoreModule, FormsModule, ReactiveFormsModule],
                declarations: [ApplyLeaveComponent, TestComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    FormBuilder,
                    { provide: Router, useClass: RouterStub },
                    { provide: LeaveService, useClass: LeaveServiceStub },
                    { provide: UserService, useClass: UserServiceStub },
                    { provide: MessageService, useclass: MessageServiceStub },
                    { provide: LeaveTypeMasterService, useclass: LeaveTypeStub }
                ]
            });
        });

        t.it('should have a defined ApplyLeaveComponent',
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
    template: '<sd-applyleave></sd-applyleave>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { return url; }
}

class UserServiceStub {
    dummyUserData = {
        "ID": 10431,
        "Name": "Mukul Tilak",
        "Department": "EBS",
        "Project": [
            {
                "Title": "Angular 2",
                "Manager": "Sagar Shelar"
            },
            {
                "Title": "EBS",
                "Manager": "Kunal Adhikari"
            }
        ]
    };

    getUserDetails() {
        return new Observable<User>(observer => {
            observer.next(this.dummyUserData)
        });
    }
}

class LeaveServiceStub {
    dummyParams = {
        "User": { "ID": 12345, "Name": "Fname Lname" },
        "NumberOfLeave": 1,
        "StartDate": "2016-12-11T18:30:00.000Z",
        "EndDate": "2016-12-11T18:30:00.000Z",
        "Comment": '',
        "Status": '',
        "Reason": 'Personal',
        "Approvers": [
            {
                "Project": 'HRMS',
                "Manager": 'Sagar Shelar',
                "Status": 'Approved',
                "Comment": 'Approved'
            },
            {
                "Project": 'EBS',
                "Manager": 'Kunal Adhikari',
                "Status": 'Approved',
                "Comment": 'Approved'
            },
            {
                "Project": 'HR',
                "Manager": 'Pooja Merchant',
                "Status": 'Approved',
                "Comment": 'Approved'
            }
        ],
        "Type": { "ID": 1, "Title": "Leave" }
    };

    addLeaveRecord(params):boolean {
        if (params === this.dummyParams) {
            return true;
        }
        else {
            return false;
        }
    }
}

class MessageServiceStub {
    addMessage(message) {
        return;
    }
}

class LeaveTypeStub {
    getLeaveTypes() {
        return [
            {
                id: 1,
                name: 'Leave'
            },
            {
                id: 2,
                name: 'Half Day Leave'
            },
            {
                id: 3,
                name: 'Absent'
            },
            {
                id: 4,
                name: 'Half Day Absent'
            },
        ];
    }
}