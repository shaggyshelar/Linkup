/** Angular Dependencies */
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';

import { Timesheet } from '../../models/timesheet';
import { MessageService } from '../../../core/shared/index';
import * as _ from 'lodash/index';
import * as moment from 'moment/moment';
import { ProjectService, PhasesService } from '../../../project/services/index';
import { TimesheetService } from '../../services/index';

/** Component Declaration */
@Component({
  moduleId: module.id,
  selector: 'add-edit-timesheet',
  templateUrl: 'add-edit-timesheet.component.html',
  styleUrls: ['add-edit-timesheet.component.css']
})
export class AddEditTimesheetComponent implements OnInit {
  selectedDate: any;
  weekStartDate: any;
  weekEndDate: any;
  projectList: SelectItem[];
  tasksList: Array<SelectItem[]>;
  dialogVisible: Boolean = false;
  dialog: any = {};
  timesheetList: any;
  errorMessage: string;
  isError: boolean;
  totalhours: any;
  notes: string = '';
  routeParam: string;
  constructor(
    private projectService: ProjectService,
    private phasesService: PhasesService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private timesheetService: TimesheetService
  ) {
  }

  ngOnInit() {
    this.notes = '';
    this.initTotalHour();
    this.timesheetList = [];
    this.tasksList = [];
    this.pushTimeSheet();
    this.selectedDate = moment(moment().format('MM/DD/YYYY')).toDate();
    this.weekStartDate = moment().add(0, 'weeks').isoWeekday(1);
    this.weekEndDate = moment().add(1, 'weeks').isoWeekday(0);
    this.projectList = [];
    this.route.params.subscribe(params => {
      this.routeParam = params['id'];
    });
    this.getProject();
  }
  getProject() {
    this.projectService.getMyProjectsForTimesheet({ Date: this.weekStartDate }).subscribe((res: any) => {
      this.projectList.push({ label: 'Select', value: null });
      for (var index in res) {
        this.projectList.push({ label: res[index].Title, value: res[index] });
      }
      if (this.routeParam) {
        this.getTimesheetForEdit();
      }
    });
  }
  getTimesheetForEdit() {
    this.timesheetService.getTimesheetByID(this.routeParam).subscribe((res: any) => {
      this.timesheetList = res.Timesheets;
      for (let i = 0; i < this.timesheetList.length; i++) {
        let project = _.find(this.projectList, function (item) {
          return item.value !== null && item.value.ID === res.Timesheets[i].Project.ID;
        });
        this.timesheetList[i].Project = project.value;
        this.onProjectChange(project.value, i)
      }
      console.log(res);
    });
  }
  initTotalHour() {
    this.totalhours = {
      MonTotal: 0,
      TueTotal: 0,
      WedTotal: 0,
      ThurTotal: 0,
      FriTotal: 0,
      SatTotal: 0,
      SunTotal: 0,
      Total: 0
    };
  }
  onPreviousWeek() {
    this.selectedDate = moment(moment(this.selectedDate).subtract(1, 'weeks').isoWeekday(1).format('MM/DD/YYYY')).toDate();
    this.weekEndDate = moment(this.selectedDate).add(1, 'weeks').isoWeekday(0);
    this.weekStartDate = moment(this.selectedDate);
  }
  onNextWeek() {
    this.selectedDate = moment(moment(this.selectedDate).add(1, 'weeks').isoWeekday(1).format('MM/DD/YYYY')).toDate();
    this.weekEndDate = moment(this.selectedDate).add(1, 'weeks').isoWeekday(0);
    this.weekStartDate = moment(this.selectedDate);
  }
  getDate(day: number) {
    return moment(this.weekStartDate).isoWeekday(day);
  }
  onProjectChange(selectedProject: any, index: number) {
    this.isError = false;
    this.tasksList[index] = [];
    this.phasesService.getPhasesByProject(selectedProject).subscribe((res: any) => {
      this.tasksList[index].push({ label: 'Select', value: null });
      for (var i in res) {
        this.tasksList[index].push({ label: res[i].PhaseName, value: res[i].PhaseName });
      }
    });
  }
  onTaskChange() {
    this.isError = false;
  }
  addNotes(index: number, property: string) {
    this.dialog = { index: index, property: property };
    this.notes = this.timesheetList[this.dialog.index][this.dialog.property];
    this.dialogVisible = true;
  }
  saveNotes() {
    if (this.notes && this.notes !== null) {
      this.timesheetList[this.dialog.index][this.dialog.property] = this.notes.trim();
    }
    this.dialogVisible = false;
  }

  saveTimsheet() {
    this.isError = false;
  }

  onSendForApproval() {
    if (!this.checkProjectAndTask()) {
      return;
    }
    if (!this.checkTotalHours()) {
      this.isError = true;
      this.errorMessage = 'Please make total hours of all days atleast 8 to submit timesheet';
    }
    if (!this.checkDescription()) {
      this.isError = true;
      this.errorMessage = 'You cannot add empty Description!';
    }
  }

  onAddTimeSheet() {
    if (!this.checkProjectAndTask()) {
      return;
    }
    this.pushTimeSheet();
  }
  pushTimeSheet() {
    this.isError = false;
    let time = new Timesheet(null, null, '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0);
    this.timesheetList.push(time);
  }
  onDelete(index: number) {
    this.timesheetList.splice(index, 1);
    this.tasksList.splice(index, 1);
    if (this.timesheetList.length === 0) {
      this.pushTimeSheet();
    }
  }
  setTimeFormat(value: any, index: number, property: string) {
    // if (!/:/.test(value)) { value += ':00'; }
    // return value.replace(/^\d{1}:/, '0$&').replace(/:\d{1}$/, '$&0');
    if (value && value.length > 0 && moment(value, 'HH:mm').isValid()) {
      let time = moment(moment(value, 'HH:mm')).format('HH:mm');
      this.timesheetList[index][property] = time;
    } else {
      this.timesheetList[index][property] = '';
    }
    this.calculateTotalHrs();
  }
  timeKeyPress(event: any) {
    if (event.charCode >= 48 && event.charCode <= 57 || event.charCode === 58) {
      return true;
    }
    return false;
  }

  checkDescription() {
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < this.timesheetList.length; i++) {
      for (let j = 0; j < days.length; j++) {
        let billableDayHrs = this.timesheetList[i][days[j] + 'hrs'];
        let billableDayDesc = this.timesheetList[i][days[j] + 'desc'];
        let nonBillableDayHrs = this.timesheetList[i][days[j] + 'nbhrs'];
        let nonBillableDayDesc = this.timesheetList[i][days[j] + 'descnb'];
        if (billableDayHrs && billableDayHrs !== null && billableDayHrs !== '') {
          if (!billableDayDesc || billableDayDesc === null || billableDayDesc === '') {
            return false;
          }
        }
        if (nonBillableDayHrs && nonBillableDayHrs !== null && nonBillableDayHrs !== '') {
          if (!nonBillableDayDesc || nonBillableDayDesc === null || nonBillableDayDesc === '') {
            return false;
          }
        }
      }
    }
    return true;
  }
  checkTotalHours() {
    if (moment(this.totalhours.MonTotal, 'HH:mm').diff(moment('8:00', 'HH:mm')) < 0) {
      return false;
    }
    if (moment(this.totalhours.TueTotal, 'HH:mm').diff(moment('8:00', 'HH:mm')) < 0) {
      return false;
    }
    if (moment(this.totalhours.WedTotal, 'HH:mm').diff(moment('8:00', 'HH:mm')) < 0) {
      return false;
    }
    if (moment(this.totalhours.ThurTotal, 'HH:mm').diff(moment('8:00', 'HH:mm')) < 0) {
      return false;
    }
    if (moment(this.totalhours.FriTotal, 'HH:mm').diff(moment('8:00', 'HH:mm')) < 0) {
      return false;
    }
    return true;
  }
  checkProjectAndTask() {
    this.isError = false;
    let timesheet = this.timesheetList[this.timesheetList.length - 1];
    if (!timesheet.Project || timesheet.Project === null) {
      this.isError = true;
      this.errorMessage = 'Please select Project';
      return false;
    }
    if (!timesheet.Task || timesheet.Task === null || timesheet.Task === '') {
      this.isError = true;
      this.errorMessage = 'Please select Task';
      return false;
    }
    return true;
  }
  calculateTotalHrs() {
    this.initTotalHour();
    for (let i = 0; i < this.timesheetList.length; i++) {
      if (this.timesheetList[i].Mondaynbhrs && this.timesheetList[i].Mondaynbhrs !== null && this.timesheetList[i].Mondaynbhrs.length > 0) {
        this.totalhours.MonTotal = moment(moment(this.totalhours.MonTotal, 'HH:mm').add(moment(this.timesheetList[i].Mondaynbhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Mondaynbhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Mondayhrs && this.timesheetList[i].Mondayhrs !== null && this.timesheetList[i].Mondayhrs.length > 0) {
        this.totalhours.MonTotal = moment(moment(this.totalhours.MonTotal, 'HH:mm').add(moment(this.timesheetList[i].Mondayhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Mondayhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Tuesdayhrs && this.timesheetList[i].Tuesdayhrs !== null && this.timesheetList[i].Tuesdayhrs.length > 0) {
        this.totalhours.TueTotal = moment(moment(this.totalhours.TueTotal, 'HH:mm').add(moment(this.timesheetList[i].Tuesdayhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Tuesdayhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Tuesdaynbhrs && this.timesheetList[i].Tuesdaynbhrs !== null && this.timesheetList[i].Tuesdaynbhrs.length > 0) {
        this.totalhours.TueTotal = moment(moment(this.totalhours.TueTotal, 'HH:mm').add(moment(this.timesheetList[i].Tuesdaynbhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Tuesdaynbhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Wednesdaynbhrs && this.timesheetList[i].Wednesdaynbhrs !== null && this.timesheetList[i].Wednesdaynbhrs.length > 0) {
        this.totalhours.WedTotal = moment(moment(this.totalhours.WedTotal, 'HH:mm').add(moment(this.timesheetList[i].Wednesdaynbhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Wednesdaynbhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Wednesdayhrs && this.timesheetList[i].Wednesdayhrs !== null && this.timesheetList[i].Wednesdayhrs.length > 0) {
        this.totalhours.WedTotal = moment(moment(this.totalhours.WedTotal, 'HH:mm').add(moment(this.timesheetList[i].Wednesdayhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Wednesdayhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Thursdaynbhrs && this.timesheetList[i].Thursdaynbhrs !== null && this.timesheetList[i].Thursdaynbhrs.length > 0) {
        this.totalhours.ThurTotal = moment(moment(this.totalhours.ThurTotal, 'HH:mm').add(moment(this.timesheetList[i].Thursdaynbhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Thursdaynbhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Thursdayhrs && this.timesheetList[i].Thursdayhrs !== null && this.timesheetList[i].Thursdayhrs.length > 0) {
        this.totalhours.ThurTotal = moment(moment(this.totalhours.ThurTotal, 'HH:mm').add(moment(this.timesheetList[i].Thursdayhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Thursdayhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Fridaynbhrs && this.timesheetList[i].Fridaynbhrs !== null && this.timesheetList[i].Fridaynbhrs.length > 0) {
        this.totalhours.FriTotal = moment(moment(this.totalhours.FriTotal, 'HH:mm').add(moment(this.timesheetList[i].Fridaynbhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Fridaynbhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Fridayhrs && this.timesheetList[i].Fridayhrs !== null && this.timesheetList[i].Fridayhrs.length > 0) {
        this.totalhours.FriTotal = moment(moment(this.totalhours.FriTotal, 'HH:mm').add(moment(this.timesheetList[i].Fridayhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Fridayhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Saturdaynbhrs && this.timesheetList[i].Saturdaynbhrs !== null && this.timesheetList[i].Saturdaynbhrs.length > 0) {
        this.totalhours.SatTotal = moment(moment(this.totalhours.SatTotal, 'HH:mm').add(moment(this.timesheetList[i].Saturdaynbhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Saturdaynbhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Saturdayhrs && this.timesheetList[i].Saturdayhrs !== null && this.timesheetList[i].Saturdayhrs.length > 0) {
        this.totalhours.SatTotal = moment(moment(this.totalhours.SatTotal, 'HH:mm').add(moment(this.timesheetList[i].Saturdayhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Saturdayhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Sundaynbhrs && this.timesheetList[i].Sundaynbhrs !== null && this.timesheetList[i].Sundaynbhrs.length > 0) {
        this.totalhours.SunTotal = moment(moment(this.totalhours.SunTotal, 'HH:mm').add(moment(this.timesheetList[i].Sundaynbhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Sundaynbhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
      if (this.timesheetList[i].Sundayhrs && this.timesheetList[i].Sundayhrs !== null && this.timesheetList[i].Sundayhrs.length > 0) {
        this.totalhours.SunTotal = moment(moment(this.totalhours.SunTotal, 'HH:mm').add(moment(this.timesheetList[i].Sundayhrs, 'HH:mm').hours() * 60 + moment(this.timesheetList[i].Sundayhrs, 'HH:mm').minutes(), 'minutes')).format('HH:mm');
      }
    }
  }
}
