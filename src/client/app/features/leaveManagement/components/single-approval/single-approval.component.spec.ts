// angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { t } from '../../../../frameworks/test/index';
import { CoreModule } from '../../../../frameworks/core/core.module';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MessageService } from '../../../core/shared/services/message.service';
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave';
import { User } from '../../models/user';

// app
import { SingleApprovalComponent } from './single-approval.component';

var urlVar: any;

export function main() {

    t.describe('Component: SingleApprovalComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoreModule, FormsModule, ReactiveFormsModule, CommonModule],
                declarations: [SingleApprovalComponent, TestComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    FormBuilder,
                    { provide: Router, useClass: RouterStub },
                    { provide: LeaveService, useClass: ServiceStub },
                    { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 6527 }]) } },
                    { provide: MessageService, useclass: MessageServiceStub }
                ]
            });
        });

        t.it('should have defined SingleApprovalComponent',
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
    template: '<singleapproval></singleapproval>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { urlVar = url[0]; }
}

class ServiceStub {
    dummyLeaveRecord = {
        "ID": 6527,
        "User": {
            "ID": 12345,
            "Name": "FName Lname",
            "Department": "EBS"
        },
        "Type": {
            "ID": 3,
            "Title": "Absent"
        },
        "StartDate": "2016-12-11T18:30:00.000Z",
        "EndDate": "2016-12-11T18:30:00.000Z",
        "NumberOfLeave": 1,
        "Comment": "Granted",
        "Status": "Approved",
        "Reason": "Going home",
        "Approvers": [
            {
                "Project": "HRMS",
                "Manager": "Sagar Shelar",
                "Status": "Approved",
                "Comment": "Approved"
            },
            {
                "Project": "EBS",
                "Manager": "Kunal Adhikari",
                "Status": "Approved",
                "Comment": "Approved"
            },
            {
                "Project": "HR",
                "Manager": "Pooja Merchant",
                "Status": "Approved",
                "Comment": "Approved"
            }
        ]
    };

    dummyData = {
        ID: 6527,
        Comment: 'Approved',
        Status: 'Approved'
    };

    getLeave() {
        return new Observable<Leave>(observer => { observer.next(this.dummyLeaveRecord) })
    }

    updateLeaveRecord(leaveID, params): boolean {
        if (leaveID === params.ID) {
            if (params === this.dummyData) {
                return true;
            }
        }
        else {
            return false;
        }
        return false;
    }
}

class MessageServiceStub {
    addMessage(message) {
        return;
    }
}
