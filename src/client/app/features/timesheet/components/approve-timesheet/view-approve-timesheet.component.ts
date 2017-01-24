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
        this.timesheetReport = [{
            id: 1,
            employeeName: 'abc',
            project: 'project1',
            date: 'Monday 01-10-2015',
            task: 'Development',
            billableHours: 8,
            nonBillableHours: 2,
            status: 'Submitted',
            totalHours: 10,
            noteBillableHours: 'note Billable Hours1',
            noteNonBillableHours: 'note NonBillable Hours1'
        }, {
                id: 2,
                employeeName: 'abc',
                project: 'project1',
                date: 'Tuesday 02-10-2015',
                task: 'Development',
                billableHours: 6,
                nonBillableHours: 2,
                status: 'Submitted',
                totalHours: 8,
                noteBillableHours: 'note Billable Hours2',
                noteNonBillableHours: 'note NonBillable Hours2'
            }, {
                id: 3,
                employeeName: 'abc',
                project: 'project1',
                date: 'Wednesday 03-10-2015',
                task: 'Development',
                billableHours: 8,
                nonBillableHours: 2,
                status: 'Submitted',
                totalHours: 10,
                noteBillableHours: 'note Billable Hours3',
                noteNonBillableHours: 'note NonBillable Hours3'
            }, {
                id: 4,
                employeeName: 'abc',
                project: 'project1',
                date: 'Thursday 04-10-2015',
                task: 'Development',
                billableHours: 7,
                nonBillableHours: 2,
                status: 'Submitted',
                totalHours: 9,
                noteBillableHours: 'note Billable Hours4',
                noteNonBillableHours: 'note NonBillable Hours4'
            }, {
                id: 5,
                employeeName: 'abc',
                project: 'project1',
                date: 'Friday 05-10-2015',
                task: 'Development',
                billableHours: 8,
                nonBillableHours: 2,
                status: 'Submitted',
                totalHours: 10,
                noteBillableHours: 'note Billable Hours5',
                noteNonBillableHours: 'note NonBillable Hours5'
            }, {
                id: 6,
                employeeName: 'abc',
                project: 'project1',
                date: 'Monday 02-11-2015',
                task: 'Development',
                billableHours: 8,
                nonBillableHours: 0,
                status: 'Submitted',
                totalHours: 8,
                noteBillableHours: 'note Billable Hours6',
                noteNonBillableHours: 'note NonBillable Hours6'
            },
        ];
    }

}
