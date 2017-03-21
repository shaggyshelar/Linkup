import { Routes } from '@angular/router';
import { ConferenceComponent } from './components/conference-booking/conference/conference.component';
import { BookComponent } from './components/conference-booking/book-conference/book-conference.component';
import { MyBookingComponent } from './components/conference-booking/my-booking/my-booking.component';
import { LogTicketComponent } from './components/ticket/log-ticket/log-ticket.component';
import { ManageTicketComponent } from './components/ticket/manage-ticket/manage-ticket.component';
import { AuthGuard } from '../core/index';

export const CorporateRoutes: Routes = [
  {
    path: '',
    redirectTo: 'conferenceBooking',
    pathMatch: 'full'
  },
  {
    path: 'manage-ticket',
    component: ManageTicketComponent,
    //canActivate: [AuthGuard],
    data: {
     // permissions: ['TICKET.READ']
    }
  },
  {
    path: 'manage-ticket/:id',
    component: ManageTicketComponent,
    //canActivate: [AuthGuard],
    data: {
     // permissions: ['TICKET.READ']
    }
  },
  {
    path: 'log-ticket',
    component: LogTicketComponent,
    //canActivate: [AuthGuard],
    data: {
      //permissions: ['TICKET.READ']
    }
  },
  {
    path: 'conferenceBooking/:room',
    component: ConferenceComponent,
   // canActivate: [AuthGuard],
    data: {
    //  permissions: ['CONFERENCE_BOOK.READ']
    }
  },
  {
    path: 'conferenceBooking',
    component: ConferenceComponent,
    //canActivate: [AuthGuard],
    data: {
    //  permissions: ['CONFERENCE_BOOK.READ']
    }
  },
  {
    path: 'newBooking',
    component: BookComponent,
   // canActivate: [AuthGuard],
    data: {
     // permissions: ['CONFERENCE_BOOK.CREATE']
    }
  },
  {
    path: 'myBookings',
    component: MyBookingComponent,
    //canActivate: [AuthGuard],
    data: {
     // permissions: ['CONFERENCE_BOOK.READ']
    }
  }
];
