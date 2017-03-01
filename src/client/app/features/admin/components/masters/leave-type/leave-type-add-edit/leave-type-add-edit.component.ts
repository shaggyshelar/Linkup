/** Angular Dependencies */
import { Router, ActivatedRoute  } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { MessageService, LeaveTypeMasterService } from '../../../../../core/shared/index';

/** Framework Dependencies */
import { Component } from '@angular/core';

import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'leave-type-add-edit',
  templateUrl: 'leave-type-add-edit.component.html'
})
export class LeaveTypeAddEditComponent implements OnInit {
  public leaveTypes:any;
  param:string;
  leaveTypeForm: FormGroup;
  selectOptions: SelectItem[];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private leaveTypeService: LeaveTypeMasterService,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {;
  }

  ngOnInit() {
     this.selectOptions = [];
     this.selectOptions.push({ label: 'Select', value: null });
     this.selectOptions.push({ label: 'Yes', value: 'Yes' });
     this.selectOptions.push({ label: 'No', value: 'No' });
     this.leaveTypeForm = this.formBuilder.group({
            ID: [0],
            Name: [''],
            AdjustmentEntryApplicable: ['', [Validators.required]],
            Applicable: ['', [Validators.required]],
            Code: ['', [Validators.required]],
            Type: ['', [Validators.required]],
            Value: ['', [Validators.required]],
    });
    this.route.params.subscribe(params => {
      this.param = params['id'];
        if (this.param) {
           this.leaveTypeService.getById(this.param)
                .subscribe((results) => {
                    this.leaveTypeForm.setValue({
                      ID: results.ID,
                      Name: results.Name,
                      Applicable: results.Applicable,
                      Code: results.Code,
                      Type: results.Type,
                      Value: results.Value,
                      AdjustmentEntryApplicable:results.AdjustmentEntryApplicable
                    });
                });
          }
    });
    this.leaveTypeService.getLeaveTypes().subscribe((res:any) => {
        this.leaveTypes=res;
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
        if (this.param) {
            this.leaveTypeService.update(value).subscribe(result => {
                if (result) {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
                    this.onCancel();
                }
            });
        } else {
            this.leaveTypeService.save(value).subscribe(result => {
                if (result) {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Saved Successfully' });
                    this.onCancel();
                }
            });
        }
    }
  onCancel() {
    this.router.navigate(['/admin/masters/leave-type']);
  }

}
