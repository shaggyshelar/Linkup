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
    constructor(
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private leaveService: LeaveService
    ) {
        this.isCancellable = true;
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

    }

    setCancellable(param:any) {
        this.isCancellable = param;
    }

    closeClicked() {
        this.router.navigate(['/leave/my-leaves']);
    }

    cancelClicked() {
        this.leaveService.deleteLeaveRecord(this.leaveID).subscribe(res => {
            if (res) {
                this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leave application deleted!' });
                this.closeClicked();
            } else {
                this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: 'Request not completed.' });
            }
        });
    }

}
