// angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { t } from '../../../../frameworks/test/index';
import { CoreModule } from '../../../../frameworks/core/core.module';

import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../core/shared/services/message.service';

import { Observable } from 'rxjs/Rx';
import { Message } from 'primeng/primeng';

import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave';


// app
import { UpdateLeaveComponent } from './update-leave.component';

var urlVar: any;

export function main() {

    t.describe('Component: UpdateLeaveComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoreModule, CommonModule],
                declarations: [UpdateLeaveComponent, TestComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: LeaveService, useClass: ServiceStub },
                    { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 6527 }]) } },
                    { provide: MessageService, useclass: MessageServiceStub }
                ]
            });
        });

        t.it('should have defined UpdateLeaveComponent',
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
    template: '<update-leave></update-leave>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { urlVar = url[0]; }
}

class ServiceStub {
    leaveRecord = {
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

    getLeave(id) {
        return new Observable<Leave>(observer => { observer.next(this.leaveRecord) })
    }
}

class MessageServiceStub {
    addMessage(message) {
        return;
    }
}
