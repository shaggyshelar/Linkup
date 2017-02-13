/** Angular Dependencies */
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { LeaveService } from '../../services/leave.service';
import { User } from '../../models/user';
import { Select } from '../../models/select';
import { ApplyLeaveValidation } from '../../models/applyLeaveValidation';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/services/message.service';
import { LeaveTypeMasterService } from '../../../core/shared/services/master/leaveTypeMaster.service';
import * as moment from 'moment/moment';
import { AuthService } from '../../../core/auth/auth.service';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { SelectItem } from 'primeng/primeng';
import { HolidayService } from '../../services/holiday.service';
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
    charsLeft: number = 600;
    isLeaveAdded: boolean = false;
    isEndDtEnable: boolean = true;
    //dayCount: any;
    leaves: SelectItem[];
    model: ApplyLeaveValidation;
    finalLeaveData:any;
    userDetail:any;
    activeProjects:any;
    holidayList:any;
    pendingLeaveCount:any;
    currentUserLeaveDetail:any;
    isValidationMessage:boolean=false;
    validationMessage:string='';
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
       this.leaveTypeService.getLeaveTypes().subscribe((res:any) => {
            this.leaves.push({ label: 'Select', value: null });
            for (var index in res) {
                if(res[index].Applicable==='Yes') {
                  this.leaves.push({ label: res[index].Type, value: res[index] });
                }
            }
        });
        this.leaveService.getActiveProjects().subscribe(res => {
            this.activeProjects=res;
        });
        this.userDetail=this.authService.getCurrentUser();
        this.holidayService.getHolidayByFinancialYear('2016').subscribe(res => {
            this.holidayList=res;
        });
        this.leaveService.getCurrentUserPendingLeaveCount().subscribe(res => {
            this.pendingLeaveCount=res;
        });
        this.leaveService.getLeaveDetails().subscribe((res: any) => {
             this.currentUserLeaveDetail = res;
        });
    }


    submitForm(form: NgForm) {
        if(this.addLeaveArr.length===0) {
            this.validateLeaveType();
            if (!this.leaveTypeValid)
                return;
            this.onAddLeave();
        }
        this.leaveService.submitLeaveRecord(this.addLeaveArr).subscribe(res => {
            if (res) {
                this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leave applied!' });
                this.cancelClick();
            } else {
                this.messageService.addMessage({ severity: 'error', summary: 'Failed', detail: 'Failed to process your request.' });
            }
        });
    }

    onAddLeave() {
        let totalNoOfdays=moment(this.model.end).diff(this.model.start, 'days')+1;
         for(let i=0;i<totalNoOfdays;i++) {
            if(this.model.leaveType.Type==='Half Day Leave' || this.model.leaveType.Type==='Leave') {
                if(moment(this.model.start).add(i, 'days').day()===6 ||
                   moment(this.model.start).add(i, 'days').day()===0 ||
                   this.checkHoliday(moment(this.model.start).add(i, 'days'))
                   ) {
                    continue;
                 }
            }
            let leave = {
                NumberOfLeaves:this.model.leaveType.Value==='0.5'?0.5:1,
                NumberOfDays: 1,
                StartDate: moment(this.model.start).add(i, 'days'),
                EndDate: moment(this.model.start).add(i, 'days'),
                Reason: this.model.reason,
                LeaveType: { ID: this.model.leaveType.ID, Value: this.model.leaveType.Name }
            };
            this.addLeaveArr.push(leave);
        }
    }
    deleteLeave(index:number) {
        this.addLeaveArr.splice(index,1);
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
        if(this.model.leaveType!==null) {
           this.leaveTypeValid = true;
           this.dayDiffCalc();
           return;
      }
    }

    reasonTextChanged() {
        this.charsLeft = 600 - this.model.reason.length;
    }

    dayDiffCalc() {
        this.isValidationMessage=false;
        this.validationMessage='';
        let dayCount =  (moment(this.model.end).diff(this.model.start, 'days')+1);
        if(this.model.leaveType!==null) {
            let weekendCount=0;
            let holidayCount=0;
            if(this.model.leaveType.Type==='Leave' || this.model.leaveType.Type==='Half Day Leave') {
                 weekendCount= this.getWeekEndCount(dayCount);
                 this.checkPending((dayCount-weekendCount)*parseFloat(this.model.leaveType.Value));
            }
            this.model.numDays=(dayCount-weekendCount)*parseFloat(this.model.leaveType.Value);
        } else {
            this.model.numDays = dayCount;
        }
    }
    getWeekEndCount(dayCount:number) {
       let weekendCount=0;
        for(let i=0;i<dayCount;i++) {
            if( moment(this.model.start).add(i, 'days').day()===6 ||
                moment(this.model.start).add(i, 'days').day()===0 ||
                this.checkHoliday(moment(this.model.start).add(i, 'days'))) {
                weekendCount= weekendCount+1;
            }
        }
        return weekendCount;
    }
    checkHoliday(date:any) {
        for(let  i=0;i<this.holidayList.length;i++ ) {
            if(moment(this.holidayList[i].HolidayDate).diff(date, 'days')===0) {
                return true;
            }
        }
        return false;
    }
    checkPending(totalLeaveApplied:number) {
        if(this.currentUserLeaveDetail.ActualBalance-this.pendingLeaveCount.LeaveTotal < totalLeaveApplied ) {
            this.validationMessage='No more leaves available. There are already pending leaves';
            this.isValidationMessage=true;
        }
    }
    cancelClick() {
        this.router.navigate(['/leave/my-leaves']);
    }

}
