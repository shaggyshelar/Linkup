import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { LogTicketComponent } from './log-ticket.component';
import { t } from '../../../../../frameworks/test/index';
import { Observable } from 'rxjs/Observable';
import { CoreModule } from '../../../../../frameworks/core/core.module';
import { SharedModule } from 'primeng/primeng';
import { TicketService } from '../../../services/ticket.service';
import { Conference } from '../../../models/conference';
import { Ticket } from '../../../models/ticket';
import * as moment from 'moment/moment';

export function main() {

    t.describe('Component: LogTicketComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, CoreModule, RouterTestingModule, SharedModule],
                declarations: [LogTicketComponent, TestComponent, RouterLinkStubDirective],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: TicketService, useClass: TicketServiceStub },
                ]
            });
        });
        t.it('should have a defined component',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.e(fixture.nativeElement).toBeTruthy();
                        t.e(TestComponent).toBeDefined();
                    });
            }));
        t.it('should have a ticket property initialize',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        t.expect(componentInstance.ticket).toBeDefined();
                        t.expect(componentInstance.items.length).toBe(4);
                    });
            }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<log-ticket></log-ticket>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { return url; }
}

@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
}
var ticketList: [{
    Id: 1,
    ticket: '',
    Department: 'IT',
    Concern: 'Abc',
    Description: 'Abc',
    Status: 'Abc',
    Priority: 'Abc',
    UpdatedBy: 'Abc',
    ResolvedBy: 'Abc',
    CreatedDate: '20-11-2018',
    UpdatedDate: '25-11-2018',
    AgeDays: 10
},
    {
        Id: 2,
        ticket: '',
        Department: 'IT',
        Concern: 'Abc',
        Description: 'Abc',
        Status: 'Abc',
        Priority: 'Abc',
        UpdatedBy: 'Abc',
        ResolvedBy: 'Abc',
        CreatedDate: '20-11-2018',
        UpdatedDate: '25-11-2018',
        AgeDays: 10
    }];

class TicketServiceStub {
    getTicketList() {
        return new Observable<Conference[]>(observer => {
            observer.next(ticketList);
        });
    }
}
