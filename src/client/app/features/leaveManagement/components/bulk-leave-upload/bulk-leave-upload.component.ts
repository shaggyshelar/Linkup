/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { LeaveService } from '../../services/leave.service';
import { MessageService } from '../../../core/shared/services/message.service';

@Component({
  moduleId: module.id,
  selector: 'bulk-leave-upload',
  templateUrl: 'bulk-leave-upload.component.html'
})
export class BulkLeaveUploadComponent implements OnInit {
  file:File;
  constructor(
    private router: Router,
    private leaveService: LeaveService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {}

  postFile(inputValue: any): void {
        try {
            let FileList: FileList = inputValue.target.files;
                if (inputValue.target.files[0].type === 'text/csv' ||
                    inputValue.target.files[0].name.split('.')[1] === 'csv') {
                    this.file= inputValue.target.files[0];
                } else {
                    this.messageService.addMessage({ severity: 'error', summary: 'Failed', detail: MessageService.BULK_LEAVE_1 });
                }
        } catch (error) {
            document.write(error);
        }

    }

  onUploadClicked(leave:any) {
    this.leaveService.bulkUpdateLeave(this.file).subscribe((res: any) => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: res.Message });
    });
  }

}
