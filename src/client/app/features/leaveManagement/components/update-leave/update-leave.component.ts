/** Angular Dependencies */
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { Message } from 'primeng/primeng';

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/services/message.service';

/** Module Level Dependencies */
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave';
import { AuthService } from '../../../core/auth/auth.service';
/** Component Declaration */

@Component({
    moduleId: module.id,
    selector: 'update-leave',
    templateUrl: 'update-leave.component.html',
    styleUrls: ['update-leave.component.css']
})
export class UpdateLeaveComponent implements OnInit {
    public leaveObs: Observable<Leave>;
    leaveID: any;
    isCancellable: boolean;
    errorMsg: string;
    today: Date;
    leaveList:any;
    approverList:any;
    activeProjects:any;
    userDetail:any;
    selectedLeave:any;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private leaveService: LeaveService
    ) {
        this.isCancellable = false;
        this.errorMsg = '';
        this.today = new Date();
    }

    ngOnInit() {
        this.userDetail=this.authService.getCurrentUser();
        this.route.params.subscribe(params => {
            this.leaveID = params['id'];
            console.log('param ID: ' + this.leaveID);
        });

        this.leaveService.getLeaveDetailByRefID(this.leaveID).subscribe(res => {
            this.leaveList=res;
        });
        this.leaveService.getApproverListByRefID(this.leaveID).subscribe(res => {
            this.approverList=res;
        });
        this.leaveService.getActiveProjects().subscribe(res => {
            this.activeProjects=res;
        });
        this.selectedLeave=this.leaveService.getEditableLeave();
        this.checkIfApproved();
    }

    checkIfApproved() {
        if(this.selectedLeave.Status==='Pending') {
            this.isCancellable = true;
        }
    }

    closeClicked() {
        this.router.navigate(['/leave/my-leaves']);
    }

    cancelClicked() {
        let leaveTobeCancelled= {
            Status: 'Cancelled',
            LeaveRequestMasterId: this.leaveID,
            ID: this.selectedLeave.ID
        };
        this.leaveService.deleteLeaveRecord(leaveTobeCancelled).subscribe(res => {
            if (res) {
                this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.APPLY_LEAVE_14  });
                this.closeClicked();
            } else {
                this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: MessageService.REQUEST_FAILED });
            }
        });
    }

}
