/** Angular Dependencies */
import { OnInit, Inject, ElementRef, Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
//import * as localForage from 'localforage';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Other Module Dependencies */
import * as moment from 'moment/moment';
import * as _ from 'lodash/lodash';

/** Module Level Dependencies */
import { ConferenceBookingService } from '../../../services/conference-booking.service';
import { Conference } from '../../../models/conference';
import { RoomService } from '../../../../core/shared/services/master/room.service';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'conference-booking',
    templateUrl: 'conference.component.html',
    styleUrls: ['conference.component.css']
})
export class ConferenceComponent implements OnInit {
    elementRef: ElementRef;
    allEvents: any[];
    header: any;
    selectedEvent: Conference;
    dialogVisible: boolean = false;
    idGen: number = 100;
    headerConfig: any;
    minTime: string;
    maxTime: string;
    conferenceRooms: Observable<any>;
    selectedRoom: string;
    serverEvents: Observable<Conference[]>;
    constructor(
        private roomService: RoomService,
        private conferenceBookingService: ConferenceBookingService,
        private router: Router, private route: ActivatedRoute,
        @Inject(ElementRef) elementRef: ElementRef
    ) {
        this.selectedEvent = new Conference(0,null, '', '', '', false,'');
        this.elementRef = elementRef;
    }
    // ngAfterViewInit() {
    //     var el: HTMLElement = this.elementRef.nativeElement;
    //     var slots = el.querySelectorAll('.ui-widget-content');
    //     _.forEach(slots, function (elem, key) {
    //         // if (key !== 0) {
    //         //     elem.addEventListener('mouseover', function (event) {
    //         //         if (!this.innerHTML && !this.className.includes('fc-axis')) {
    //         //           this.innerHTML='<div class="btn calender-btn-add"  style="float:right">+Add</div>';
    //         //         }
    //         //     });
    //         //     elem.addEventListener('mouseout', function (event) {
    //         //         if (!this.className.includes('fc-axis')) {
    //         //              this.innerHTML='';
    //         //         }
    //         //     });
    //         // }
    //     });
    // }
    ngOnInit() {
        this.serverEvents = this.conferenceBookingService.getConferenceBooking();
        this.serverEvents.subscribe(result => {
            if (result) {
                this.allEvents = result;
                this.route.params.forEach((params: Params) => {
                    let room = params['room'];
                    if (room) {
                        this.getEventByRooms(room);
                    } else {
                        this.getEventByRooms('AllRooms');
                    }
                });
            }
        });
        this.minTime = '07:00:00';
        this.maxTime = '22:00:00';
        if (window.screen.width < 768) {
            this.headerConfig = {
                left: 'prev,next today',
                center: 'title',
                right: 'agendaWeek,agendaDay'
            };
        } else {
            this.headerConfig = {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            };
        }

        //    localForage.getItem('conferenceEvent').then((value) => {
        //         if (value !== null) {
        //             this.allEvents.push(value);
        //         }
        //         this.events = this.allEvents;
        //     });
        //this.events = this.allEvents;
        this.conferenceRooms = this.roomService.getConferenceRooms();
    };
    handleDayClick(event:any) {
        this.conferenceBookingService.setSelectedSlot(event);
        this.router.navigate(['/corporate/newBooking']);
    }

    handleEventClicked(event: any) {
        this.selectedEvent = event.calEvent;
        this.selectedEvent.start = moment(this.selectedEvent.start).format('DD/MM/YY hh:MM a');
        this.selectedEvent.end = moment(this.selectedEvent.end).format('DD/MM/YY hh:MM a');
        this.dialogVisible = true;
    }

    getEventByRooms(room: string) {
        this.selectedRoom = room;
        if (room === 'AllRooms') {
            this.serverEvents = new Observable<Conference[]>((observer:any) => {
                observer.next(this.allEvents);
            });
        } else {
            let events: Conference[] = [];
            events = _.filter(this.allEvents, function (item:any) {
                return item.Room.Name === room;
            });
            this.serverEvents = new Observable<Conference[]>((observer:any) => {
                observer.next(events);
            });
        }
    }
}
