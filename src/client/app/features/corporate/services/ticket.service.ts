/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
//import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Ticket } from '../models/ticket';

/** Context for service calls */
export const CONTEXT = 'Ticket';

/** Service Definition */
@Injectable()
export class TicketService extends BaseService {

    constructor(public http : Http) {
        super(http, CONTEXT);
    }

    /**
     * getTicketById method
     */
    getTicketById(id : string) : Observable < Ticket > {
        return this
            .get$(id)
            .map(res => res.json());
    }

    /**
     * getTicketById method
     */
    saveTicket(ticket : any) : Observable < any > {
        return this
            .post$(ticket)
            .map(res => res.json());
    }

    /**
     * getTicketById method
     */
    editTicket(ticket : any) : Observable < any > {
        return this
            .put$(ticket.Id, ticket)
            .map(res => res.json());
    }

    /**
     * getTicketList method
     */
    getTicketList() : Observable < Ticket[] > {
        return this
            .getList$()
            .map(res => res.json());
    }
}
