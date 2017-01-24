/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
//import { Leave } from '../../models/leave';
// import { Employee } from '../models/employee';
import { Conference } from '../models/conference';

/** Context for service calls */
export const CONTEXT = 'conferenceBooking';

/** Service Definition */
@Injectable()
export class ConferenceBookingService extends BaseService {
    selectedSlot: any;

    constructor( public http: Http) {
        super(http, CONTEXT);
    }
    setSelectedSlot(event:any) {
        this.selectedSlot = event;
    }
    getSelectedSlot() {
       return this.selectedSlot;
    }
    getConferenceBooking(): Observable<Conference[]> {
        return this.getList$().map(res => res.json());
    }

    saveConference(conference:any): Observable<any> {
        return this.post$(conference, true).map(res => res.json());
    }

    getConferenceById(id:string): Observable<Conference> {
        return this.get$(id, true).map(res => res.json());
    }

    deleteMyBooking(id:string): Observable<any> {
        return this.delete$(id, true);
    }
}
