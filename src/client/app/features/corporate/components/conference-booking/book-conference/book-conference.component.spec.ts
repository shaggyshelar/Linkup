import { TestBed, fakeAsync, tick,async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BookComponent } from './book-conference.component';
import { DropdownModule, SharedModule, CalendarModule, ButtonModule } from 'primeng/primeng';
import { ConferenceBookingService } from '../../../services/conference-booking.service';
import { MessageService } from '../../../../core/shared/services/message.service';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RoomService } from '../../../../core/shared/services/master/room.service';

export function main() {

    describe('Component: BookComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, CalendarModule,
                          ButtonModule, DropdownModule, SharedModule, FormsModule, ReactiveFormsModule],
                declarations: [BookComponent, TestComponent, RouterLinkStubDirective],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    FormBuilder,
                    { provide: Router, useClass: RouterStub },
                    { provide: RoomService, useClass: RoomServiceStub },
                    { provide: ConferenceBookingService, useClass: ConferenceBookingServiceStub },
                    { provide: MessageService, useClass: MessageServiceStub },
                ]
            });
        });
        it('should have a defined component',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        expect(fixture.nativeElement).toBeTruthy();
                        expect(TestComponent).toBeDefined();
                    });
            }));
        it('should have a conferenceRooms property initialize',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        expect(componentInstance.conferenceRooms).toBeDefined();
                    });
            }));
        // it('should save a record',
        //     async(() => {
        //         TestBed.compileComponents()
        //             .then(() => {
        //                 let fixture = TestBed.createComponent(TestComponent);
        //                 fixture.detectChanges();
        //                 let componentInstance = fixture.debugElement.children[0].componentInstance;
        //                 componentInstance.conferenceModel.title = 'Meeting';
        //                 componentInstance.conferenceModel.start = new Date();
        //                 componentInstance.conferenceModel.end = new Date();
        //                 componentInstance.selectedRoom = { name: 'Bahamas', color: 'red' };
        //                 componentInstance.save();
        //                 expect(componentInstance.conferenceModel.conference).toBe('Bahamas');
        //                 expect(componentInstance.conferenceModel.color).toBe('red');
        //             });
        //     }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<book-conference></book-conference>'
})
class TestComponent { }


class RouterStub {
    navigate(url: any) { return url; }
}

class ConferenceBookingServiceStub {
    getConferenceBooking(conference:any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    getSelectedSlot() {
        return;
    }
}

class MessageServiceStub {
    addMessage(message:any) {
        return;
    }
}

@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
}

class RoomServiceStub {
    getConferenceRooms() {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
}
