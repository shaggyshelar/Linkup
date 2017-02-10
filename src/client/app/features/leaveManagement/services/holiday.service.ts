/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { Holiday } from '../models/holiday';
// import { Employee } from '../models/employee';

/** Context for service calls */
export const CONTEXT = 'Holiday';

/** Service Definition */
@Injectable()
export class HolidayService extends BaseService {

    constructor(public http: Http) {
        super(http, CONTEXT);
    }

    /**
     * getHolidays method
     * Gets array of Holiday objects
     */
    getHolidays(): Observable<Holiday> {
        let currentYear = new Date().getFullYear().toString();
        let items = localStorage.getItem(currentYear);

        if (items === null) {
            console.log('Get Data from server');
        } else {
            console.log('Found Holidays in LocalStorage', JSON.parse(items));
        }

        return this.getList$(0, 0, true).map(res => {
            localStorage.setItem(currentYear, JSON.stringify(res.json()));
            return res.json();
        });
    }
}
