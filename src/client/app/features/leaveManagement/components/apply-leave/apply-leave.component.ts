/** Angular Dependencies */
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
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
import { AuthService } from '../../../core/auth/auth.service';
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

export class ApplyLeaveComponent implements OnInit {
    leaveTypesObs: Observable<Select>;
    leaveObs: Observable<boolean>;
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
    finalLeaveData:any;
    userDetail:any;
    activeProjects:any;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private userService: UserService,
        private leaveService: LeaveService,
        private leaveTypeService: LeaveTypeMasterService,
        private formBuilder: FormBuilder,
        private authService: AuthService
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
       this.leaveTypeService.getLeaveTypes().subscribe((res:any) => {
            this.leaves.push({ label: 'Select', value: null });
            for (var index in res) {
                this.leaves.push({ label: res[index].Type, value: res[index] });
            }
        });
        this.leaveService.getActiveProjects().subscribe(res => {
            this.activeProjects=res;
        });
        this.userDetail=this.authService.getCurrentUser();
    }


    submitForm(form: NgForm) {
        let leaveDetails:any=[];
        if(this.addLeaveArr.length===0) {
            this.validateLeaveType();
            if (!this.leaveTypeValid)
                return;
             let leave = {
                 NumberOfDays: this.model.numDays,
                 StartDate: this.model.start,
                 EndDate: this.model.end,
                 Reason: this.model.reason,
                 LeaveType: { ID: this.model.leaveType.ID, Value: this.model.leaveType.Name }
            };
            leaveDetails.push(leave);
        } else {
            leaveDetails=this.addLeaveArr;
        }
        this.leaveService.submitLeaveRecord(leaveDetails).subscribe(res => {
            if (res) {
                this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leave applied!' });
                this.cancelClick();
            } else {
                this.messageService.addMessage({ severity: 'error', summary: 'Failed', detail: 'Failed to process your request.' });
            }
        });
    }

    onAddLeave() {
      if(this.model.numDays===0.5) {
            let leave = {
            NumberOfLeaves: this.model.numDays,
            NumberOfDays: 1,
            StartDate: this.model.start,
            EndDate: this.model.start,
            Reason: this.model.reason,
            LeaveType: { ID: this.model.leaveType.ID, Value: this.model.leaveType.Name }
         };
            this.addLeaveArr.push(leave);
      } else {
        for(let i=0;i<this.model.numDays;i++) {
         let leave = {
            NumberOfLeaves: 1,
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
    deleteLeave(index:number) {
        this.addLeaveArr.splice(index,1);
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
        if(this.model.leaveType!==null) {
            switch (this.model.leaveType.ID) {
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
    }

    reasonTextChanged() {
        this.charsLeft = 600 - this.model.reason.length;
    }

    dayDiffCalc() { // input given as Date objects
        this.dayCount =  (moment(this.model.end).diff(this.model.start, 'days')+1);
        this.model.numDays = this.dayCount;
        return this.dayCount;
    }

    cancelClick() {
        this.router.navigate(['/leave/my-leaves']);
    }

}
