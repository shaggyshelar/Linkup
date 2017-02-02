import { OnInit, Component } from '@angular/core';

/** Other Module Dependencies */
import { ConfirmationService } from 'primeng/primeng';
import { MessageService } from '../../../../core/shared/services/message.service';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { ConferenceBookingService } from '../../../services/conference-booking.service';
import { Conference } from '../../../models/conference';
import { RoomService } from '../../../../core/shared/services/master/room.service';
/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'my-booking',
    templateUrl: 'my-booking.component.html',
    styleUrls: ['my-booking.component.css']
})

export class MyBookingComponent implements OnInit {
    bookings: Observable<Conference[]>;
    conferenceRooms: Observable<any>;
    constructor(
        private roomService: RoomService,
        private messageService: MessageService,
        private conferenceBookingService: ConferenceBookingService,
        private confirmationService: ConfirmationService) {
    }
    ngOnInit() {
        this.conferenceRooms = this.roomService.getConferenceRooms();
        this.getMyBooking();
    }
    getMyBooking() {
        this.bookings = this.conferenceBookingService.getConferenceBooking();
    }
    confirm(ticket:any) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.conferenceBookingService.deleteMyBooking(ticket.Id).subscribe(results => {
                    this.getMyBooking();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Record deleted' });
                });
            }
        });
    }
}
