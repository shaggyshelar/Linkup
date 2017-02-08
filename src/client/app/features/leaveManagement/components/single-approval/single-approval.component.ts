/** Angular Dependencies */
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { Message } from 'primeng/primeng';


/** Module Level Dependencies */
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave';
import { User } from '../../models/user';
import { ApprovalForm } from '../../models/leaveApprovalValidation';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/services/message.service';

/** Component Declaration */


@Component({
    moduleId: module.id,
    selector: 'single-approval',
    templateUrl: 'single-approval.component.html',
    styleUrls: ['single-approval.component.css']
})

export class SingleApprovalComponent implements OnInit {
    leaveID: number;
    leaveObs: Observable<Leave>;
    userDetObs: Observable<User>;
    requests: any;
    servRows = 6;
    singleApprovalForm: FormGroup;
    model: any;
    approverList:any;
    validationMessage: string = '';
    approved: boolean = false;
    rejected: boolean = false;
    leaveList:any;
    userDetail:any;
    isPending: boolean=false;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private leaveService: LeaveService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {

        this.model = {
            comments: ''
        };
        this.singleApprovalForm = this.formBuilder.group({
            comments: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(600)]]
        });
    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.leaveID = params['id'];
        });
        this.leaveService.getLeaveDetailByRefID(this.leaveID).subscribe(res => {
            this.leaveList=res;
            this.getEmployeeDetails(this.leaveList[0].EmpID);
            if(this.leaveList[0].Status==='Pending') {
                this.isPending=true;
            }
        });
        this.leaveService.getApproverListByRefID(this.leaveID).subscribe(res => {
            this.approverList=res;
        });

    }
    getEmployeeDetails(id:any) {
        this.leaveService.getEmployeeDetail(id).subscribe(res => {
            this.userDetail=res;
        });
    }
    approveClicked({ value, valid }: { value: ApprovalForm, valid: boolean }) {
        if (valid) {
            this.model.comments = value.comments;
            var params = {
                Comments: this.model.comments.trim(),
                Status: 'Approved',
                LeaveRequestRefId:this.leaveID
            };

            this.leaveService.singleLeaveApprove(params)
                .subscribe(res => {
                    if (res) {
                        this.rejected = false;
                        this.approved = true;
                        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leave approved!' });
                        this.closeClicked();
                    } else {
                        this.rejected = true;
                        this.approved = false;
                        this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: 'Request not completed.' });
                    }
                });
        }
    }

    rejectClicked({ value, valid }: { value: ApprovalForm, valid: boolean }) {
        if (valid) {
        //    BACKEND CALL HERE
            this.model.comments = value.comments;
            var params = [{
                Comments: this.model.comments.trim(),
                Status: 'Rejected',
                LeaveRequestRefId:this.leaveID
            }];

            this.leaveService.updateLeaveRecord(this.leaveID, params)
                .subscribe(res => {
                    if (res) {
                        this.rejected = true;
                        this.approved = false;
                        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leave rejected!' });
                        this.closeClicked();
                        this.singleApprovalForm.reset();
                    } else {
                        this.rejected = false;
                        this.approved = true;
                        this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: 'Request not completed.' });
                    }
                });
        }
    }

    closeClicked() {
        this.model.comments = '';
        this.router.navigate(['/leave/approve-leave']);
    }
}
