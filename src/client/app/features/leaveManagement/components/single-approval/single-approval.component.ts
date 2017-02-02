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

    validationMessage: string = '';
    approved: boolean = false;
    rejected: boolean = false;

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
            this.leaveID = +params['id'];
        });
        this.leaveObs = this.leaveService.getLeave(this.leaveID);

    }

    approveClicked({ value, valid }: { value: ApprovalForm, valid: boolean }) {
        if (valid) {
        //    BACKEND CALL HERE
            this.model.comments = value.comments;
            var params = [{
                ID: this.leaveID,
                Comment: this.model.comments.trim(),
                Status: 'Approved'
            }];

            this.leaveService.updateLeaveRecord(this.leaveID, params)
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
                ID: this.leaveID,
                Comment: this.model.comments.trim(),
                Status: 'Rejected'
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
