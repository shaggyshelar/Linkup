/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { HolidayService } from '../../services/holiday.service';
import { Holiday } from '../../models/holiday';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/services/message.service';

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

export class HolidaysComponent {

  holidaysObs: Observable<Holiday>;
  servRows = 7;

  holidays: any;
  events: any[];

  eventDay: MyEvent;
  dialogVisible: boolean = false;

  holidayDetails: boolean = false;
  holiday: Holiday;

  constructor(
    private messageService: MessageService,
    private router: Router, 
    private holidayService: HolidayService
  ) {
    this.holidays = [];
    this.holiday = { ID: null, HolidayDate: '', HolidayType: '', WeekDay: '', Title: '' };
  }


  ngOnInit() {
    this.holidaysObs = this.holidayService.getHolidays();
    this.holidaysObs.subscribe(res => {
    });

  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
  handleEventClicked(event) {
    let start = event.calEvent.start;
    start.stripTime();
    this.holiday.Title = event.calEvent.title;
    this.holiday.HolidayDate = start._i;
    this.dialogVisible = true;
  }

  typeClicked(holiday) {
    this.holiday = {
      ID: null,
      HolidayDate: holiday.start,
      HolidayType: holiday.HolidayType,
      WeekDay: holiday.WeekDay,
      Title: holiday.title
    };
    this.holidayDetails = true;

  }

  arrangeData(params) {
    // TODO : Code For Arrange Leave
  }

}
