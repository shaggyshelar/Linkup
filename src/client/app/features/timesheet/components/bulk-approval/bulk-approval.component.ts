/** Angular Dependencies */
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { Message } from 'primeng/primeng';

/** Module Level Dependencies */

/** Other Module Dependencies */
import { MessageService } from '../../../core/shared/index';

/** Component Declaration */

@Component({
  moduleId: module.id,
  selector: 'bulk-approval',
  templateUrl: 'bulk-approval.component.html',
  styleUrls: ['bulk-approval.component.css']
})
export class BulkApproveComponent implements OnInit {

  ngOnInit() {
  }

}
