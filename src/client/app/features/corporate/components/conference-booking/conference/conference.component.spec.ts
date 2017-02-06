import { TestBed,async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { ConferenceComponent } from './conference.component';
import { SharedModule, ScheduleModule } from 'primeng/primeng';
import { RouterTestingModule } from '@angular/router/testing';
import { ConferenceBookingService } from '../../../services/conference-booking.service';
import { Conference } from '../../../models/conference';
import { RoomService } from '../../../../core/shared/services/master/room.service';
import * as moment from 'moment/moment';

export function main() {

    describe('Component: ConferenceComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ RouterTestingModule,  SharedModule, ScheduleModule],
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
        it('should have initialize component',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        fixture.detectChanges();
                        expect(componentInstance.allEvents.length).toBe(2);
                        expect(TestComponent).toBeDefined();
                    });
            }));
        it('should call handleEventClicked method',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        fixture.detectChanges();
                        componentInstance.handleEventClicked({ calEvent: { start: new Date, end: new Date } });
                        expect(componentInstance.selectedEvent.start).toBe(moment().format('DD/MM/YY hh:MM a'));
                        expect(componentInstance.selectedEvent.end).toBe(moment().format('DD/MM/YY hh:MM a'));
                    });
            }));
        it('should call getEventByRooms method',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        fixture.detectChanges();
                        componentInstance.getEventByRooms('Bahamas');
                        expect(componentInstance.selectedRoom).toBe('Bahamas');
                    });
            }));
        it('TC_01: To check what is displayed on the Screen when conference booking is Selected',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement.querySelectorAll('.fc-agendaDay-view').length).toBe(1);
                    });
            }));
        it('TC_02: To check what are the contents on the Page Conference booking',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement.querySelectorAll('.fc-agendaDay-view').length).toBe(1);
                        expect(fixture.nativeElement.querySelectorAll('.color-list').length).toBe(2);
                        expect(fixture.nativeElement.querySelector('button.btn.btn-default').innerHTML).toBe('Manage My Booking');
                        expect(fixture.nativeElement.querySelectorAll('button.fc-month-button').length).toBe(1);
                        expect(fixture.nativeElement.querySelectorAll('button.fc-agendaWeek-button').length).toBe(1);
                        expect(fixture.nativeElement.querySelectorAll('button.fc-agendaDay-button').length).toBe(1);
                    });
            }));
        it('TC_03: To check whether different conference Rooms are displayed or not',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement.querySelectorAll('.color-list').length).toBe(2);
                    });
            }));
        it('TC_04: To check whether each conference Rooms are having unique colors or not',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement.querySelectorAll('.color-list').length).toBe(2);
                    });
            }));
        it('TC_05:To check whether Day View is Displayed on the main page or not',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement.querySelectorAll('.fc-agendaDay-view').length).toBe(1);
                    });
            }));
        it('TC_07:To check whether any option provided For booking conference room or not',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement.querySelector('button.btn.btn-default').innerHTML).toBe('Manage My Booking');
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
    setSelectedSlot(event:any) {
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
}];
class RoomServiceStub {
    getConferenceRooms() {
        return new Observable<any>((observer:any) => {
            observer.next(conferenceRooms);
        });
    }
}
