/** Angular Declarations */
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/** Module Level Dependencies */
import { Timesheet } from '../../models/timesheet';
import { EmployeeTimesheetService } from '../../services/index';
import { MessageService } from '../../../core/shared/index';

/** Component Declarations */
@Component({
    moduleId: module.id,
    selector: 'view-approve-timesheet',
    templateUrl: 'view-approve-timesheet.component.html',
    styleUrls: ['approve-timesheet.component.css']
})
export class ViewApproveTimesheetComponent implements OnInit {

    timesheetReport: any;
    routeParam: string;
    startDate: any;
    endDate: any;
    employeeName: string = '';
    comment: string = '';
    charsLeft: number = 600;
    textareaLength: number = 600;
    CommentError: Boolean = false;
    submittedStatus: string;
    constructor(
        private employeeTimesheetService: EmployeeTimesheetService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.timesheetReport = {};
        this.route.params.subscribe(params => {
            this.routeParam = params['id'];
        });
        this.employeeTimesheetService.getTimesheetApprovalData(this.routeParam).subscribe((res: any) => {
            this.timesheetReport = res;
            this.startDate = this.timesheetReport.ApproverTimesheet[0].Date;
            this.endDate = this.timesheetReport.ApproverTimesheet[this.timesheetReport.ApproverTimesheet.length - 1].Date;
            this.employeeName = this.timesheetReport.Employee.Name;
            this.submittedStatus = this.timesheetReport.SubmittedStatus;
            if (this.submittedStatus === 'Approved') {
                this.comment = this.timesheetReport.Comments;
            }
        });
    }
    reasonTextChanged() {
        this.CommentError = false;
        this.charsLeft = 600 - this.comment.length;
    }
    onApprove() {
        this.CommentError = false;
        this.timesheetReport.Comments = this.comment;
        this.timesheetReport.SubmittedStatus = 'Approved';
        this.employeeTimesheetService.approveTimesheet(this.timesheetReport).subscribe((res: any) => {
            this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.TIMESHEET_APPROVE });
            this.router.navigate(['/timesheet/approved']);
        });
    }
    onReject() {
        this.CommentError = false;
        if (this.comment !== null && this.comment.length !== 0) {
            this.timesheetReport.Comments = this.comment;
            this.timesheetReport.SubmittedStatus = 'Reject';
            this.employeeTimesheetService.rejectTimesheet(this.timesheetReport).subscribe((res: any) => {
                this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.TIMESHEET_REJECT });
                this.router.navigate(['/timesheet/approved']);
            });
        } else {
            this.CommentError = true;
        }
    }
    onCancel() {
        if (this.submittedStatus === 'Approved') {
            this.router.navigate(['/timesheet/approved']);
        } else {
            this.router.navigate(['/timesheet/approve']);
        }
    }
}
