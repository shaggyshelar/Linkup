/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { HolidayService } from '../../services/index';
import { Holiday } from '../../models/holiday';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/index';
import * as moment from 'moment/moment';

/** Component Declaration */

export class MyEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean = true;
}

@Component({
  moduleId: module.id,
  selector: 'view-holidays',
  templateUrl: 'holidays.component.html'
})

export class HolidaysComponent implements OnDestroy, OnInit {
  servRows = 7;

  holidays: any;
  events: any[];

  eventDay: MyEvent;
  dialogVisible: boolean = false;

  holidayDetails: boolean = false;
  holiday: Holiday;
  holidayList: any;
  pendingHoliday: any;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private holidayService: HolidayService
  ) {
    this.holidays = [];
    this.holiday = { ID: null, HolidayDate: '', HolidayType: '', WeekDay: '', Title: '' };
  }


  ngOnInit() {
    this.holidayService.getHolidays().subscribe((res: any) => {
      this.holidayList = [];
      this.pendingHoliday = [];
      for (let i = 0; i < res.length; i++) {
        res[i].title = res[i].Title;
        res[i].start = moment(res[i].HolidayDate);
        res[i].color = '#288054';
        this.holidayList.push(res[i]);
        if ((moment(res[i].start).diff(moment(), 'days')) > -1) {
          this.pendingHoliday.push(res[i]);
        }
      }
      this.holidayList = res;
    });
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
  handleEventClicked(event: any) {
    let start = event.calEvent.start;
    start.stripTime();
    this.holiday.Title = event.calEvent.title;
    this.holiday.HolidayDate = start._i;
    this.dialogVisible = true;
  }

  typeClicked(holiday: any) {
    this.holiday = {
      ID: null,
      HolidayDate: holiday.start,
      HolidayType: holiday.HolidayType,
      WeekDay: holiday.WeekDay,
      Title: holiday.title
    };
    this.holidayDetails = true;

  }

  arrangeData(params: any) {
    // TODO : Code For Arrange Leave
  }

}
