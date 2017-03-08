/** Angular Declarations */
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/** Module Level Dependencies */
import { Timesheet } from '../../models/timesheet';
import { EmployeeTimesheetService } from '../../services/index';

/** Component Declarations */
@Component({
    moduleId: module.id,
    selector: 'view-approve-timesheet',
    templateUrl: 'view-approve-timesheet.component.html',
    styleUrls: ['approve-timesheet.component.css']
})
export class ViewApproveTimesheetComponent implements OnInit {

    timesheetReport: Timesheet[];
    routeParam: string;
    constructor(
        private employeeTimesheetService: EmployeeTimesheetService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.timesheetReport = []
        this.route.params.subscribe(params => {
            this.routeParam = params['id'];
        });
        this.employeeTimesheetService.getTimesheetApprovalData(this.routeParam).subscribe((res: any) => {
            this.timesheetReport = res;
        });
    }

}
