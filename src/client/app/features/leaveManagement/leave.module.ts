/** Angular Dependencies */
import { NgModule } from '@angular/core';
//import { RouterModule  } from '@angular/router';

/** Third Party Dependencies */

/** Module Level Dependencies */
// Components Declarations
import { CommonModule } from '../core/index';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { ApproveLeaveComponent } from './components/approve-leave/approve-leave.component';
import { BulkApproveComponent } from './components/bulk-approval/bulk-approval.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';
import { SingleApprovalComponent } from './components/single-approval/single-approval.component';
import { UpdateLeaveComponent } from './components/update-leave/update-leave.component';
import { ResignedEmployeeComponent } from './components/resigned-employee-leave/resigned-employee-list/resigned-employee-list.component';
import { UpdateResignedEmployeeComponent } from './components/resigned-employee-leave/update-resigned-employee-leave/update-resigned-employee-leave.component';

// Service Declarations
import { LeaveService } from './services/leave.service';
import { HolidayService } from './services/holiday.service';
import { UserService } from './services/user.service';
import { LeaveTypeMasterService } from '../core/shared/services/master/leaveTypeMaster.service';

/** Module Definition */
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [
        ApplyLeaveComponent,
        ApproveLeaveComponent,
        BulkApproveComponent,
        HolidaysComponent,
        MyLeavesComponent,
        SingleApprovalComponent,
        UpdateLeaveComponent,
        ResignedEmployeeComponent,
        UpdateResignedEmployeeComponent
    ],
    providers: [LeaveService, HolidayService, UserService, LeaveTypeMasterService],
})

export class LeaveModule {
}
