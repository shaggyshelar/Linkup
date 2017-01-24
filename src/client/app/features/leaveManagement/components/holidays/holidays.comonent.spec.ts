// angular
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { t } from '../../../../frameworks/test/index';
import { CoreModule } from '../../../../frameworks/core/core.module';

import { Router } from '@angular/router';

import { MessageService } from '../../../core/shared/services/message.service';
import { Observable } from 'rxjs/Rx';
import { HolidayService } from '../../services/holiday.service';
import { Holiday } from '../../models/holiday';
// app
import { HolidaysComponent } from './holidays.component';

export function main() {

    t.describe('Component: HolidaysComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoreModule],
                declarations: [HolidaysComponent, TestComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: HolidayService, useClass: HolidayServiceStub },
                    { provide: MessageService, useclass: MessageServiceStub }
                ]
            });
        });

        t.it('should have a defined HolidaysComponent',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.e(fixture.nativeElement).toBeTruthy();
                        t.e(TestComponent).toBeDefined();
                    });
            }));

    });

}

@Component({
    selector: 'test-cmp',
    template: '<view-holidays></view-holidays>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { return url; }
}

class HolidayServiceStub {
    dummyHolidays = [
        {
            "ID": 1,
            "title": "Lakshmi Pujan",
            "start": "2016-10-30",
            "WeekDay": "Sunday",
            "HolidayType": "Fixed"
        },
        {
            "ID": 2,
            "title": "Bhai Duj",
            "start": "2016-11-02",
            "WeekDay": "Tuesday",
            "HolidayType": "Fixed"
        },
        {
            "ID": 3,
            "title": "Christmas",
            "start": "2016-12-25",
            "WeekDay": "Sunday",
            "HolidayType": "Fixed"
        },
        {
            "ID": 4,
            "title": "New Year",
            "start": "2017-01-01",
            "WeekDay": "Sunday",
            "HolidayType": "Fixed"
        },
        {
            "ID": 5,
            "title": "Makar Sankaranti",
            "start": "2017-01-14",
            "WeekDay": "Saturday",
            "HolidayType": "Fixed"
        },
        {
            "ID": 6,
            "title": "Republic Day",
            "start": "2017-01-26",
            "WeekDay": "Saturday",
            "HolidayType": "Fixed"
        },
        {
            "ID": 7,
            "title": "Holi",
            "start": "2016-03-13",
            "WeekDay": "Monday",
            "HolidayType": "Fixed"
        }
    ];


    getHolidays() {
        return new Observable<Holiday>(observer => { observer.next(this.dummyHolidays) });
    }
}

class MessageServiceStub {
    addMessage(message) {
        return;
    }
}
