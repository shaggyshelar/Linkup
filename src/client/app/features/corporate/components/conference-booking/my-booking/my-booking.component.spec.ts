import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { MyBookingComponent } from './my-booking.component';
import { t } from '../../../../../frameworks/test/index';
import { Observable } from 'rxjs/Observable';
import { CoreModule } from '../../../../../frameworks/core/core.module';
import { SharedModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { MultilingualModule } from '../../../../../frameworks/i18n/multilingual.module';
import { ConferenceBookingService } from '../../../services/conference-booking.service';
import { Conference } from '../../../models/conference';
import { MessageService } from '../../../../core/shared/services/message.service';
import { RoomService } from '../../../../core/shared/services/master/room.service';

import * as moment from 'moment/moment';

export function main() {

    t.describe('Component: MyBookingComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, CoreModule, MultilingualModule, RouterTestingModule, SharedModule, ConfirmDialogModule],
                declarations: [MyBookingComponent, TestComponent, RouterLinkStubDirective],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: ConferenceBookingService, useClass: ConferenceBookingServiceStub },
                    { provide: RoomService, useClass: RoomServiceStub },
                    { provide: MessageService, useClass: MessageServiceStub },
                    ConfirmationService]
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
        t.it('should have a bookings property initialize',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        t.expect(componentInstance.bookings).toBeDefined();
                    });
            }));
        t.it('TC_10:To check what are the contents of the Table provided',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('Title')).not.toBe(-1);
                        t.expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('Start Time')).not.toBe(-1);
                        t.expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('End Time')).not.toBe(-1);
                        t.expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('Attendees')).not.toBe(-1);
                        t.expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('Conference Rooms')).not.toBe(-1);
                        t.expect(fixture.nativeElement.querySelector('p-datatable').innerHTML.search('Delete')).not.toBe(-1);
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
    @Input('routerLink') linkParams: any;
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
        return new Observable<Conference[]>(observer => {
            observer.next(conferenceList);
        });
    }
}

class MessageServiceStub {
    addMessage(message) {
        return;
    }
}
class RoomServiceStub {
    getConferenceRooms() {
        return;
    }
}
