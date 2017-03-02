/** Angular Dependencies */
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { User } from '../../models/user';
import { Select } from '../../models/select';
import { ApplyLeaveValidation } from '../../models/applyLeaveValidation';

/** Other Module Dependencies */
import { MessageService, LeaveTypeMasterService } from '../../../core/shared/index';
import * as moment from 'moment/moment';
import { AuthService } from '../../../core/index';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { SelectItem } from 'primeng/primeng';
import { HolidayService, LeaveService } from '../../services/index';
/** Component Declaration */


@Component({
    moduleId: module.id,
    selector: 'apply-leave',
    templateUrl: 'apply-leave.component.html',
    styleUrls: ['apply-leave.component.css']
})

export class ApplyLeaveComponent implements OnInit {
    applyLeaveForm: FormGroup;
    addLeaveArr: any[];
    leaveTypeValid: boolean = true;
    leaveID: number;
    //strtDt: any;
    //endDt: any;
    minDate: Date;
    textareaLength: number = 600;
    charsLeft: number = 600;
    isLeaveAdded: boolean = false;
    isEndDtEnable: boolean = true;
    //dayCount: any;
    leaves: SelectItem[];
    model: ApplyLeaveValidation;
    finalLeaveData: any;
    userDetail: any;
    activeProjects: any;
    holidayList: any;
    pendingLeaveCount: any;
    currentUserLeaveDetail: any;
    isValidationMessage: boolean = false;
    formDisabled: boolean = false;
    hideLeaveList: boolean = false;
    itsWeekend: boolean = false;
    validationMessage: string = '';
    constructor(
        private messageService: MessageService,
        private router: Router,
        private leaveService: LeaveService,
        private leaveTypeService: LeaveTypeMasterService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private holidayService: HolidayService
    ) {
        this.leaves = [];
        this.addLeaveArr = [];

        this.model = {
            User: {
                ID: 12345,
                Name: 'Lname Fname'
            },
            numDays: 1,
            leaveType: null,
            end: moment(moment().format('MM/DD/YYYY')).toDate(),
            start: moment(moment().format('MM/DD/YYYY')).toDate(),
            reason: ''
        };

        this.applyLeaveForm = this.formBuilder.group({
            numDays: ['', [Validators.required]],
            leaveType: ['', [Validators.required]],
            start: ['', [Validators.required]],
            end: ['', [Validators.required]],
            reason: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(600)]]
        });
    }

    ngOnInit() {
        this.leaveTypeService.getLeaveTypes().subscribe((res: any) => {
            this.leaves.push({ label: 'Select', value: null });
            for (var index in res) {
                if (res[index].Applicable === 'Yes') {
                    this.leaves.push({ label: res[index].Type, value: res[index] });
                }
            }
        });
        this.leaveService.getActiveProjects().subscribe(res => {
            this.activeProjects = res;
        });
        this.userDetail = this.authService.getCurrentUser();
        let financialYear = moment().year();
        if (moment().month() <= 2) {
            financialYear = financialYear - 1;
        }
        this.holidayService.getHolidayByFinancialYear(financialYear.toString()).subscribe(res => {
            this.holidayList = res;
        });
        this.leaveService.getCurrentUserPendingLeaveCount().subscribe(res => {
            this.pendingLeaveCount = res;
        });
        this.leaveService.getLeaveDetails().subscribe((res: any) => {
            if (res === null) {
                this.validationMessage = MessageService.APPLY_LEAVE_1;
                this.isValidationMessage = true;
                this.formDisabled = true;
            } else {
                this.currentUserLeaveDetail = res;
            }
        });
    }


    submitForm(form: NgForm) {
        if (this.addLeaveArr.length === 0) {
            this.validateLeaveType();
            if (!this.leaveTypeValid)
                return;
            this.onAddLeave();
            this.hideLeaveList = true;
        }
        this.leaveService.submitLeaveRecord(this.addLeaveArr).subscribe(res => {
            if (res) {
                this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.APPLY_LEAVE_2 });
                this.cancelClick();
            } else {
                this.messageService.addMessage({ severity: 'error', summary: 'Failed', detail: MessageService.REQUEST_FAILED });
            }
        });
    }

    onAddLeave() {
        this.checkIfAlreadyAdded();
        if (!this.isValidationMessage) {
            let totalNoOfdays = moment(this.model.end).diff(this.model.start, 'days') + 1;
            for (let i = 0; i < totalNoOfdays; i++) {
                if (this.model.leaveType.Type === 'Half Day Leave' || this.model.leaveType.Type === 'Leave') {
                    if (moment(this.model.start).add(i, 'days').day() === 6 ||
                        moment(this.model.start).add(i, 'days').day() === 0 ||
                        this.checkHoliday(moment(this.model.start).add(i, 'days'))
                    ) {
                        continue;
                    }
                }
                let leave = {
                    NumberOfLeaves: this.model.leaveType.Value === '0.5' ? 0.5 : 1,
                    NumberOfDays: 1,
                    StartDate: moment(this.model.start).add(i, 'days'),
                    EndDate: moment(this.model.start).add(i, 'days'),
                    Reason: this.model.reason,
                    LeaveType: { ID: this.model.leaveType.ID, Value: this.model.leaveType.Name }
                };
                this.addLeaveArr.push(leave);
            }
        }
    }
    deleteLeave(index: number) {
        this.addLeaveArr.splice(index, 1);
    }
    startChanged() {
        this.model.end = this.model.start;
        this.minDate = this.model.start;
        this.dayDiffCalc();
    }

    endChanged() {
        //this.strtDt = this.model.start;
        //this.endDt = this.model.end;
        this.dayDiffCalc();
    }

    validateLeaveType() {
        if (this.model.leaveType !== null) {
            this.leaveTypeValid = true;
            this.dayDiffCalc();
            return;
        }
    }

    reasonTextChanged() {
        this.charsLeft = 600 - this.model.reason.length;
    }

    dayDiffCalc() {
        this.itsWeekend = false;
        this.isValidationMessage = false;
        this.validationMessage = '';
        let leavevalue = 1;
        this.checkIfAlreadyAdded();
        let dayCount = (moment(this.model.end).diff(this.model.start, 'days') + 1);
        if (this.model.leaveType !== null) {
            let weekendCount = 0;
            let holidayCount = 0;
            if (this.model.leaveType.Type === 'Half Day Absent (LWP)' || this.model.leaveType.Type === 'Half Day Leave') {
                leavevalue = 0.5;
            }
            if (this.model.leaveType.Type === 'Leave' || this.model.leaveType.Type === 'Half Day Leave') {
                weekendCount = this.getWeekEndCount(dayCount);
                this.checkPending((dayCount - weekendCount) * leavevalue);
            } else if (this.model.leaveType.Type === 'Marriage Leave') {
                weekendCount = this.getWeekEndCount(dayCount);
                this.checkMarriagePending((dayCount - weekendCount) * leavevalue);
            } else if (this.model.leaveType.Type === 'Paternity Leave') {
                weekendCount = this.getWeekEndCount(dayCount);
                this.checkPaternityPending((dayCount - weekendCount) * leavevalue);
            } else if (this.model.leaveType.Type === 'Maternity Leave') {
                this.checkMaternityPending((dayCount - weekendCount) * leavevalue);
            }
            this.model.numDays = (dayCount - weekendCount) * leavevalue;
            if (this.model.leaveType.Type === 'Half Day Absent (LWP)') {
                let weekendCountLWP = this.getWeekEndCount(dayCount);
                this.model.numDays = this.model.numDays + weekendCountLWP / 2;
            }
            this.checkForTraineeAndResigned();
        } else {
            this.model.numDays = dayCount;
        }
        this.checkIfAlreadyApplied();
    }
    checkIfAlreadyAdded() {
        let totalNoOfdays = moment(this.model.end).diff(this.model.start, 'days') + 1;
        for (let i = 0; i < this.addLeaveArr.length; i++) {
            for (let j = 0; j < totalNoOfdays; j++) {
                if (moment((this.model.start)).add(j, 'days').diff(this.addLeaveArr[i].StartDate) === 0) {
                    this.isValidationMessage = true;
                    this.validationMessage = MessageService.APPLY_LEAVE_13;
                    break;
                }
            }
        }
    }
    getWeekEndCount(dayCount: number) {
        let weekendCount = 0;
        for (let i = 0; i < dayCount; i++) {
            if (moment(this.model.start).add(i, 'days').day() === 6 ||
                moment(this.model.start).add(i, 'days').day() === 0 ||
                this.checkHoliday(moment(this.model.start).add(i, 'days'))) {
                weekendCount = weekendCount + 1;
            }
        }
        if (weekendCount === dayCount && this.model.leaveType.Type !== 'Half Day Absent (LWP)') {
            this.itsWeekend = true;
        }
        return weekendCount;
    }
    checkHoliday(date: any) {
        for (let i = 0; i < this.holidayList.length; i++) {
            if (moment(this.holidayList[i].HolidayDate).diff(date, 'days') === 0) {
                return true;
            }
        }
        return false;
    }
    checkPending(totalLeaveApplied: number) {
        if (this.currentUserLeaveDetail.ActualBalance - this.pendingLeaveCount.LeaveTotal < totalLeaveApplied) {
            if (this.pendingLeaveCount.LeaveTotal == 0) {
                this.validationMessage = MessageService.APPLY_LEAVE_3;
            } else {
                this.validationMessage = MessageService.APPLY_LEAVE_4;
            }
            this.isValidationMessage = true;
        }
    }
    checkMarriagePending(totalLeaveApplied: number) {
        let totalMarriageLeave = parseInt(this.model.leaveType.Value);
        let takenMarriageLeave = this.currentUserLeaveDetail.MarriageLeaveTaken;
        let pendingMarriageLeave = this.pendingLeaveCount.MarriageLeaveTotal;
        if (totalMarriageLeave - takenMarriageLeave - pendingMarriageLeave < totalLeaveApplied) {
            if (pendingMarriageLeave == 0) {
                this.validationMessage = MessageService.APPLY_LEAVE_5;
            } else {
                this.validationMessage = MessageService.APPLY_LEAVE_6;
            }
            this.isValidationMessage = true;
        }
    }
    checkPaternityPending(totalLeaveApplied: number) {
        let totalPaternityLeave = parseInt(this.model.leaveType.Value);
        let takenPaternityLeave = this.currentUserLeaveDetail.PaternityLeaveTaken;
        let pendingPaternityLeave = this.pendingLeaveCount.PaternityLeaveTotal;
        if (totalPaternityLeave - takenPaternityLeave - pendingPaternityLeave < totalLeaveApplied) {
            if (pendingPaternityLeave == 0) {
                this.validationMessage = MessageService.APPLY_LEAVE_7;
            } else {
                this.validationMessage = MessageService.APPLY_LEAVE_8;
            }
            this.isValidationMessage = true;
        }
    }
    checkMaternityPending(totalLeaveApplied: number) {
        let totalMaternityLeave = parseInt(this.model.leaveType.Value);
        let takenMaternityLeave = this.currentUserLeaveDetail.MaternityLeaveTaken;
        let pendingMaternityLeave = this.pendingLeaveCount.MaternityLeaveTotal;
        if (totalMaternityLeave - takenMaternityLeave - pendingMaternityLeave < totalLeaveApplied) {
            if (pendingMaternityLeave == 0) {
                this.validationMessage = MessageService.APPLY_LEAVE_9;
            } else {
                this.validationMessage = MessageService.APPLY_LEAVE_10;
            }
            this.isValidationMessage = true;
        }
    }
    checkIfAlreadyApplied() {
        if (this.model.leaveType !== null && !this.isValidationMessage) {
            let param = {
                LeaveType: { ID: this.model.leaveType.ID, Value: this.model.leaveType.Name },
                StartDate: this.model.start,
                EndDate: this.model.end
            };
            this.leaveService.checkIfAlreadyApplied(param).subscribe(res => {
                if (res.StartDate !== null && !this.isValidationMessage) {
                    this.validationMessage = 'You have already applied a leave from '
                        + moment(res.StartDate).format('DD/MM/YYYY') + ' to ' + moment(res.EndDate).format('DD/MM/YYYY');
                    this.isValidationMessage = true;
                }
            });
        }
    }
    checkForTraineeAndResigned() {
        if (this.model.leaveType.Type === 'Leave' || this.model.leaveType.Type === 'Half Day Leave') {
            if ((this.userDetail.Designation.Value === 'Trainee' ||
                this.userDetail.Status.Value === 'Resigned') && !this.isValidationMessage) {
                let param = {
                    LeaveType: { ID: this.model.leaveType.ID, Value: this.model.leaveType.Name },
                    StartDate: this.model.start,
                    EndDate: this.model.end,
                    NumberOfDays: this.model.numDays
                };
                this.leaveService.checkIfAlreadyAppliedForTrainee(param).subscribe(res => {
                    if (res !== null) {
                        if (parseInt(res.LeaveTotal) >= 1 || this.model.numDays > 1) {
                            this.validationMessage = MessageService.APPLY_LEAVE_11;
                            this.isValidationMessage = true;
                        } else if (parseInt(res.HalfdayLeaveTotal) >= 1 || this.model.numDays > 1) {
                            this.validationMessage = MessageService.APPLY_LEAVE_12;
                            this.isValidationMessage = true;
                        }
                    }
                });
            }
        }
    }
    cancelClick() {
        this.router.navigate(['/leave/my-leaves']);
    }
}
