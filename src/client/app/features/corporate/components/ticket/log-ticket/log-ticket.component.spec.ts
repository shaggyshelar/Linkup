import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive } from '@angular/core';
import { LogTicketComponent } from './log-ticket.component';
import { Observable } from 'rxjs/Observable';
import { SharedModule } from 'primeng/primeng';
import { TicketService } from '../../../services/ticket.service';
import { Conference } from '../../../models/conference';
import { Ticket } from '../../../models/ticket';
import * as moment from 'moment/moment';

export function main() {

    describe('Component: LogTicketComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, RouterTestingModule, SharedModule],
                declarations: [LogTicketComponent, TestComponent, RouterLinkStubDirective],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: TicketService, useClass: TicketServiceStub },
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
        it('should have a ticket property initialize',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        expect(componentInstance.ticket).toBeDefined();
                        expect(componentInstance.items.length).toBe(4);
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
        return new Observable<Conference[]>((observer:any) => {
            observer.next(ticketList);
        });
    }
}
