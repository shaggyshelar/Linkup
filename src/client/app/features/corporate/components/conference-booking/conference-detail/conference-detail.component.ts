import { OnInit, Component } from '@angular/core';

/** Other Module Dependencies */
import { ConfirmationService } from 'primeng/primeng';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { ConferenceBookingService } from '../../../services/conference-booking.service';
import { Conference } from '../../../models/conference';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'conference-detail',
    templateUrl: 'conference-detail.component.html',
})

export class ConferenceDetailComponent implements OnInit {
    conferenceEvent: Conference;
    conferenceRooms: any[];
    constructor(private conferenceBookingService: ConferenceBookingService) {
    }
    ngOnInit() {
        this.getConferenceById();
    }
    getConferenceById() {
        // this.conferenceBookingService.getConferenceById(1).subscribe(results => {
        //     this.conferenceEvent = results;
        // });
    }
}
