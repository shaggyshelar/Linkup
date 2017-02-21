import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { LeaveService } from '../../../leaveManagement/services/leave.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard-component',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
    public leaveDetail: any;
    constructor(private leaveService: LeaveService) {
        this.leaveDetail = {};
    }

    ngOnInit() {
        this.leaveService.getLeaveDetails().subscribe((res: any) => {
            this.leaveDetail = res;
        });
    }
}
