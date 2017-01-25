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

/** Component Declaration */

@Component({
    moduleId: module.id,
    selector: 'update-leave',
    templateUrl: 'update-leave.component.html',
    styleUrls: ['update-leave.component.css']
})
export class UpdateLeaveComponent {
    public leaveObs: Observable<Leave>;
    leaveID: any;
    isCancellable: boolean;
    errorMsg: string;
    today: Date;

    constructor(
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private leaveService: LeaveService
    ) {
        this.isCancellable = true;
        this.errorMsg = '';
        this.today = new Date();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.leaveID = +params['id'];
            console.log('param ID: ' + this.leaveID);
        });

        this.leaveObs = this.leaveService.getLeave(this.leaveID);
        this.leaveObs.subscribe(res => {
            res.Status === 'Approved' ? this.isCancellable = true : this.isCancellable = false;
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
                this.closeClicked()
            }
            else {
                this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: 'Request not completed.' });
            }
        });
    }

}
