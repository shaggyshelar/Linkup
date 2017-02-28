/** Angular Dependencies */
import { Router, ActivatedRoute  } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { LeaveTypeMasterService } from '../../../../../core/shared/services/master/leaveTypeMaster.service';

import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'leave-type-add-edit',
  templateUrl: 'leave-type-add-edit.component.html'
})
export class LeaveTypeAddEditComponent implements OnInit {
  public leaveTypes:any;
  param:string;
  leaveForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private leaveTypeService: LeaveTypeMasterService,
    private route: ActivatedRoute,
  ) {;
  }

  ngOnInit() {
       this.leaveForm = this.formBuilder.group({
            ID: [0],
            Name: ['', [Validators.required]],
        });
    this.route.params.subscribe(params => {
      this.param = params['id'];
        if (this.param) {
                this.leaveTypeService.getById(this.param)
                    .subscribe((results) => {
                        this.leaveForm.setValue({
                            ID: results.ID,
                            Name: results.Name
                        });
                    });
            }
    });
    this.leaveTypeService.getLeaveTypes().subscribe((res:any) => {
        this.leaveTypes=res;
    });
  }

  oneCancel() {
    this.router.navigate(['/admin/masters/leave-type']);
  }

}
