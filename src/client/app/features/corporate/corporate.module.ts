
/** Angular Dependencies */
import { NgModule } from '@angular/core';


/** Module Level Dependencies */
// Components Declarations
import { CommonModule } from '../core/index';
import { ConferenceComponent } from './components/conference-booking/conference/conference.component';
import { BookComponent } from './components/conference-booking/book-conference/book-conference.component';
import { MyBookingComponent } from './components/conference-booking/my-booking/my-booking.component';
import { LogTicketComponent } from './components/ticket/log-ticket/log-ticket.component';
import { ManageTicketComponent } from './components/ticket/manage-ticket/manage-ticket.component';
// Services Delarations
import { ConferenceBookingService } from './services/conference-booking.service';
import { TicketService } from './services/ticket.service';
import { RoomService } from '../core/shared/services/master/room.service';
import { ConcernService } from '../core/shared/services/master/concern.service';
import { DepartmentService } from '../core/shared/services/master/department.service';
import { PriorityService } from '../core/shared/services/master/priority.service';

/** Module Definition */
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [
        ConferenceComponent,
        BookComponent,
        MyBookingComponent,
        LogTicketComponent,
        ManageTicketComponent
    ],
    providers: [
        ConferenceBookingService,
        TicketService,
        RoomService,
        ConcernService,
        DepartmentService,
        PriorityService
        ],
})
export class CorporateModule {
}
