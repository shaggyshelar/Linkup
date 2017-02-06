import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { MyBookingComponent } from './my-booking.component';
import { Observable } from 'rxjs/Observable';
import { SharedModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { ConferenceBookingService } from '../../../services/conference-booking.service';
import { Conference } from '../../../models/conference';
import { MessageService } from '../../../../core/shared/services/message.service';
import { RoomService } from '../../../../core/shared/services/master/room.service';

import * as moment from 'moment/moment';

export function main() {

    describe('Component: MyBookingComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, RouterTestingModule, SharedModule, ConfirmDialogModule],
                declarations: [MyBookingComponent, TestComponent, RouterLinkStubDirective],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: ConferenceBookingService, useClass: ConferenceBookingServiceStub },
                    { provide: RoomService, useClass: RoomServiceStub },
                    { provide: MessageService, useClass: MessageServiceStub },
                    ConfirmationService]
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
        it('should have a bookings property initialize',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        expect(componentInstance.bookings).toBeDefined();
                    });
            }));
        it('TC_10:To check what are the contents of the Table provided',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('Title')).not.toBe(-1);
                        expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('Start Time')).not.toBe(-1);
                        expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('End Time')).not.toBe(-1);
                        expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('Attendees')).not.toBe(-1);
                        expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('Conference Rooms')).not.toBe(-1);
                        expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('Delete')).not.toBe(-1);
                    });
            }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<my-booking></my-booking>'
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
var conferenceList = [
    {
        Id: 1,
        'title': 'Inteview',
        'start': moment().add(2, 'hours'),
        'end': moment().add(4, 'hours'),
        'Room': {
            'Color': '#8877A9',
            'Name': 'Caribbean'
        },
        'color': '#8877A9',
        'Attendees': 'xyz'
    },
    {
        Id: 2,
        'title': 'Jenzabar Client call',
        'start': moment(),
        'end': moment().add(3, 'hours'),
        'Room': {
            'Color': '#3FABA4',
            'Name': 'Dubai'
        },
        'color': '#3FABA4',
        'Attendees': 'xyz'

    }
];
class ConferenceBookingServiceStub {
    getConferenceBooking() {
        return new Observable<Conference[]>((observer:any) => {
            observer.next(conferenceList);
        });
    }
}

class MessageServiceStub {
    addMessage(message:any) {
        return;
    }
}
class RoomServiceStub {
    getConferenceRooms() {
        return;
    }
}
