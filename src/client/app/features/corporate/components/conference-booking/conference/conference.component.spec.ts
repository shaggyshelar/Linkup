import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { ConferenceComponent } from './conference.component';
import { t } from '../../../../../frameworks/test/index';
import { CoreModule } from '../../../../../frameworks/core/core.module';
import { SharedModule, ScheduleModule } from 'primeng/primeng';
import { MultilingualModule } from '../../../../../frameworks/i18n/multilingual.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ConferenceBookingService } from '../../../services/conference-booking.service';
import { Conference } from '../../../models/conference';
import { RoomService } from '../../../../core/shared/services/master/room.service';
import * as moment from 'moment/moment';

export function main() {

    t.describe('Component: ConferenceComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoreModule, RouterTestingModule, MultilingualModule, SharedModule, ScheduleModule],
                declarations: [ConferenceComponent, TestComponent, RouterLinkStubDirective],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: ConferenceBookingService, useClass: ConferenceBookingServiceStub },
                    { provide: RoomService, useClass: RoomServiceStub },
                    { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'room': 1 }]) } }
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
        t.it('should have initialize component',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        fixture.detectChanges();
                        t.e(componentInstance.allEvents.length).toBe(2);
                        t.e(TestComponent).toBeDefined();
                    });
            }));
        t.it('should call handleEventClicked method',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        fixture.detectChanges();
                        componentInstance.handleEventClicked({ calEvent: { start: new Date, end: new Date } });
                        t.e(componentInstance.selectedEvent.start).toBe(moment().format('DD/MM/YY hh:MM a'));
                        t.e(componentInstance.selectedEvent.end).toBe(moment().format('DD/MM/YY hh:MM a'));
                    });
            }));
        t.it('should call getEventByRooms method',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        fixture.detectChanges();
                        componentInstance.getEventByRooms('Bahamas');
                        t.e(componentInstance.selectedRoom).toBe('Bahamas');
                    });
            }));
        t.it('TC_01: To check what is displayed on the Screen when conference booking is Selected',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelectorAll('.fc-agendaDay-view').length).toBe(1);
                    });
            }));
        t.it('TC_02: To check what are the contents on the Page Conference booking',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelectorAll('.fc-agendaDay-view').length).toBe(1);
                        t.expect(fixture.nativeElement.querySelectorAll('.color-list').length).toBe(2);
                        t.expect(fixture.nativeElement.querySelector('button.btn.btn-default').innerHTML).toBe('Manage My Booking');
                        t.expect(fixture.nativeElement.querySelectorAll('button.fc-month-button').length).toBe(1);
                        t.expect(fixture.nativeElement.querySelectorAll('button.fc-agendaWeek-button').length).toBe(1);
                        t.expect(fixture.nativeElement.querySelectorAll('button.fc-agendaDay-button').length).toBe(1);
                    });
            }));
        t.it('TC_03: To check whether different conference Rooms are displayed or not',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelectorAll('.color-list').length).toBe(2);
                    });
            }));
        t.it('TC_04: To check whether each conference Rooms are having unique colors or not',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelectorAll('.color-list').length).toBe(2);
                    });
            }));
        t.it('TC_05:To check whether Day View is Displayed on the main page or not',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelectorAll('.fc-agendaDay-view').length).toBe(1);
                    });
            }));
        t.it('TC_07:To check whether any option provided For booking conference room or not',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelector('button.btn.btn-default').innerHTML).toBe('Manage My Booking');
                    });
            }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<conference-booking></conference-booking>'
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
    setSelectedSlot(event) {
        return;
    }
    getSelectedSlot() {
        return;
    }
}
var conferenceRooms = [{
    ID: 1,
    Name: 'Bahamas',
    Color: '#E7C5F5'
}, {
    ID: 2,
    Name: 'Dubai',
    Color: '#3FABA4'
}]
class RoomServiceStub {
    getConferenceRooms() {
        return new Observable<any>(observer => {
            observer.next(conferenceRooms);
        });
    }
}
