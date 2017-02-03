/** Angular Dependencies */
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { LeaveService } from '../../services/leave.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Select } from '../../models/select';
import { ApplyLeaveValidation } from '../../models/applyLeaveValidation';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/services/message.service';
import { LeaveTypeMasterService } from '../../../core/shared/services/master/leaveTypeMaster.service';
import * as moment from 'moment/moment';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { SelectItem } from 'primeng/primeng';

/** Component Declaration */


@Component({
    moduleId: module.id,
    selector: 'apply-leave',
    templateUrl: 'apply-leave.component.html',
    styleUrls: ['apply-leave.component.css']
})

export class ApplyLeaveComponent implements OnInit,OnDestroy {
    leaveTypesObs: Observable<Select>;
    leaveObs: Observable<boolean>;
    userObs: Observable<User>;
    applyLeaveForm: FormGroup;
    addLeaveArr: any[];
    leaveTypeValid: boolean = true;
    leaveID: number;
    strtDt: any;
    endDt: any;
    minDate: Date;
    charsLeft: number = 600;
    isLeaveAdded: boolean = false;
    isEndDtEnable: boolean = true;
    dayCount: any;
    leaves: SelectItem[];
    model: ApplyLeaveValidation;
    subLeaveType: any;
    finalLeaveData:any;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private userService: UserService,
        private leaveService: LeaveService,
        private leaveTypeService: LeaveTypeMasterService,
        private formBuilder: FormBuilder
    ) {
        this.leaves = [
            // { label: 'Submit', value: null },
            // { label: 'Leave', value: { id: 1, name: 'Leave' } },
            // { label: 'Half-day Leave', value: { id: 2, name: 'Half-day Leave' } },
            // { label: 'Absent', value: { id: 3, name: 'Absent' } },
            // { label: 'Half-day Absent', value: { id: 4, name: 'Half-day Absent' } }
        ];
        this.addLeaveArr = [];

        this.model = {
            User: {
                ID: 12345,
                Name: 'Lname Fname'
            },
            numDays: 1,
            leaveType: null,
            end: new Date(),
            start: new Date(),
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

        this.userObs = this.userService.getUserDetails();
        this.subLeaveType = this.leaveTypeService.getLeaveTypes().subscribe((res:any) => {
            this.leaves.push({ label: 'Select', value: null });
            for (var index in res) {
                this.leaves.push({ label: res[index].name, value: res[index] });
            }
        });
    }

    ngOnDestroy() {
        this.subLeaveType.unsubscribe();
    }

    submitForm(form: NgForm) {
        this.validateLeaveType();
        if (!this.leaveTypeValid)
            return;

        //call to backend submit
        let params = {
            User: this.model.User,
            NumberOfLeave: this.model.numDays,
            StartDate: this.model.start,
            EndDate: this.model.end,
            Comment: '',
            Status: '',
            Reason: this.model.reason,
            Approvers: [
                {
                    Project: 'HRMS',
                    Manager: 'Sagar Shelar',
                    Status: 'Approved',
                    Comment: 'Approved'
                },
                {
                    Project: 'EBS',
                    Manager: 'Kunal Adhikari',
                    Status: 'Approved',
                    Comment: 'Approved'
                },
                {
                    Project: 'HR',
                    Manager: 'Pooja Merchant',
                    Status: 'Approved',
                    Comment: 'Approved'
                }
            ],
            Type: { ID: this.model.leaveType.id, Title: this.model.leaveType.name }
        };
        console.log('mode : ' + JSON.stringify(this.model));
        this.leaveService.addLeaveRecord(params).subscribe(res => {
            if (res) {
                this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leave applied!' });
                this.cancelClick();
            } else {
                this.messageService.addMessage({ severity: 'error', summary: 'Failed', detail: 'Failed to process your request.' });
            }
        });
    }

    startChanged() {
        this.model.end = this.model.start;
        this.minDate = this.model.start;
    }

    endChanged() {
        this.strtDt = this.model.start;
        this.endDt = this.model.end;
        this.dayDiffCalc();
    }

    validateLeaveType() {
        switch (this.model.leaveType.id) {
            case 1:
                this.leaveTypeValid = true;
                this.isEndDtEnable = true;
                this.leaveID = 1;
                this.model.numDays = 1;
                return;

            case 2:
                this.leaveTypeValid = true;
                this.model.numDays = 0.5;
                this.isEndDtEnable = false;
                this.leaveID = 2;
                return;

            case 3:
                this.leaveTypeValid = true;
                this.isEndDtEnable = true;
                this.leaveID = 3;
                this.model.numDays = 1;
                return;

            case 4:
                this.leaveTypeValid = true;
                this.model.numDays = 0.5;
                this.isEndDtEnable = false;
                this.leaveID = 4;
                return;

            default:
                this.leaveTypeValid = false;
                this.model.numDays = 0;
                return;
        }
    }

    reasonTextChanged() {
        this.charsLeft = 600 - this.model.reason.length;
    }

    dayDiffCalc() { // input given as Date objects
        this.dayCount =  (moment(this.model.end).diff(this.model.start, 'days')+1);
        this.model.numDays = this.dayCount;
        // var dDate1 = this.model.start;
        // var dDate2 = this.model.end;
        // var iWeeks:any, iDateDiff:any, iAdjust = 0;
        // if (dDate2 < dDate1) return -1; // error code if dates transposed
        // var iWeekday1 = dDate1.getDay(); // day of week
        // var iWeekday2 = dDate2.getDay();
        // iWeekday1 = (iWeekday1 === 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
        // iWeekday2 = (iWeekday2 === 0) ? 7 : iWeekday2;
        // if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
        // iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
        // iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

        // // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
        // iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000);

        // if (iWeekday1 <= iWeekday2) {
        //     iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1);
        // } else {
        //     iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2);
        // }

        // iDateDiff -= iAdjust; // take into account both days on weekend

        // this.model.numDays = this.dayCount = (iDateDiff + 1); // add 1 because dates are 
        return this.dayCount;
    }

    cancelClick() {
        this.router.navigate(['/leave/my-leaves']);
    }

}
