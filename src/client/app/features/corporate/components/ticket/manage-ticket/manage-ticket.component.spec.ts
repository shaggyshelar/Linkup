import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { ManageTicketComponent } from './manage-ticket.component';
import { Observable } from 'rxjs/Observable';
import { DropdownModule, SharedModule, ButtonModule } from 'primeng/primeng';
import { TicketService } from '../../../services/ticket.service';
import { MessageService } from '../../../../core/shared/services/message.service';
import { Ticket } from '../../../models/ticket';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ConcernService } from '../../../../core/shared/services/master/concern.service';
import { DepartmentService } from '../../../../core/shared/services/master/department.service';
import { PriorityService } from '../../../../core/shared/services/master/priority.service';

export function main() {

    describe('Component: ManageTicketComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownModule, SharedModule, ButtonModule],
                declarations: [ManageTicketComponent, TestComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: TicketService, useClass: TicketServiceStub },
                    { provide: MessageService, useClass: MessageServiceStub },
                    { provide: ConcernService, useClass: ConcernServiceStub },
                    { provide: DepartmentService, useClass: DepartmentServiceStub },
                    { provide: PriorityService, useClass: PriorityServiceStub },
                    { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 1 }]) } }
                ]
            });
        });
        it('should have a defined component',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement).toBeTruthy();
                        expect(TestComponent).toBeDefined();
                    });
            }));
        it('should have a departments property initialize',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        expect(componentInstance.departments).toBeDefined();
                    });
            }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<manage-ticket></manage-ticket>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { return url; }
}

class TicketServiceStub {
    editTicket(ticket: any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    saveTicket(ticket: any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    getTicketById(id: any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
}

class MessageServiceStub {
    addMessage(message: any) {
        return;
    }

}

class ConcernServiceStub {
    getConcernList() {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
}
class DepartmentServiceStub {
    getDepartmentList() {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
}
class PriorityServiceStub {
    getPriorityList() {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
}
