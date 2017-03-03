/** Angular Declarations */
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

/** Module Level Dependencies */
import { Timesheet } from '../../models/timesheet';

/** Component Declarations */
@Component({
    moduleId: module.id,
    selector: 'view-approve-timesheet',
    templateUrl: 'view-approve-timesheet.component.html',
    styleUrls: ['approve-timesheet.component.css']
})
export class ViewApproveTimesheetComponent implements OnInit {

    timesheetReport: Timesheet[];

    constructor(
        private router: Router) {
    }

    ngOnInit(): void {
        this.timesheetReport = []
    }

}
