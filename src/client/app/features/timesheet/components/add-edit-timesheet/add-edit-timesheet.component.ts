/** Angular Dependencies */
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import * as moment from 'moment/moment';
import { ProjectService, PhasesService } from '../../../project/services/index';
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
  tasksList: SelectItem[];
  dialogVisible: Boolean = false;
  constructor(
    private projectService: ProjectService,
    private phasesService: PhasesService
  ) {

  }

  ngOnInit() {
    this.selectedDate = moment(moment().format('MM/DD/YYYY')).toDate();
    this.weekStartDate = moment().add(0, 'weeks').isoWeekday(1);
    this.weekEndDate = moment().add(1, 'weeks').isoWeekday(0);
    this.projectList = [];
    this.projectService.getMyProjectsForTimesheet({ Date: this.weekStartDate }).subscribe((res: any) => {
      this.projectList.push({ label: 'Select', value: null });
      for (var index in res) {
        this.projectList.push({ label: res[index].Title, value: res[index] });
      }
    });
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
  onProjectChange(selectedProject: any) {
    this.tasksList = [];
    this.phasesService.getPhasesByProject(selectedProject).subscribe((res: any) => {
      this.tasksList.push({ label: 'Select', value: null });
      for (var index in res) {
        this.tasksList.push({ label: res[index].PhaseName, value: res[index] });
      }
    });
  }
  addNotes() {
    this.dialogVisible = true;
  }
}
