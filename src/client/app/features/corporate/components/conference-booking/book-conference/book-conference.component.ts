import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Other Module Dependencies */
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash/index';
//import * as localForage from 'localforage';
import { Conference } from '../../../models/conference';
import { ConferenceBookingService } from '../../../services/conference-booking.service';
import { MessageService } from '../../../../core/shared/services/message.service';
import * as moment from 'moment/moment';
import { RoomService } from '../../../../core/shared/services/master/room.service';
/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'book-conference',
    templateUrl: 'book-conference.component.html'
})

export class BookComponent implements OnInit {
    property: string;
    recurrance: boolean;
    recurrancePattern: string;
    recurranceEndDate: Date;
    conferenceRooms: SelectItem[];
    selectedRoom: any;
    startTime: Date;
    endTime: Date;
    conferenceForm: FormGroup;
    endTimeError: boolean = false;
    constructor(
        private roomService: RoomService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private conferenceBookingService: ConferenceBookingService,
        private router: Router
    ) { }
    ngOnInit() {
        this.conferenceForm = this.formBuilder.group({
            //id: [null],
            title: ['', [Validators.required]],
            start: ['', [Validators.required]],
            end: ['', [Validators.required]],
            Room: ['', [Validators.required]],
            allDay: [false],
            Description: [''],
            SpecialComment: [''],
            NoOfGuest: ['', Validators.pattern('[0-9]+')],

        });
        this.roomService.getConferenceRooms().subscribe(result => {
            this.conferenceRooms = [];
            this.conferenceRooms.push({ label: 'Select Room', value: null });
            _.forEach(result, (element:any) => {
                this.conferenceRooms.push({
                    label: element.Name,
                    value: element
                });
            });
        });
        let event = this.conferenceBookingService.getSelectedSlot();
    }
    onSubmit({ value, valid }: { value: Conference, valid: boolean }) {
        if (moment(value.end).diff(value.start, 'minutes') > 0) {
            value.color = value.Room.Color;
            value.start = moment(value.start).format();
            value.end = moment(value.end).format();
            this.conferenceBookingService.saveConference(value).subscribe(result => {
                if (result) {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Conference Room Booked' });
                    this.router.navigate(['/corporate/conferenceBooking']);
                }
            });
        } else {
            this.endTimeError = true;
        }
    }
    onCancel() {
        this.router.navigate(['/corporate/conferenceBooking']);
    }
}
