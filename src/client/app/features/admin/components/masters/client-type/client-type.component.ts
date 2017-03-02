/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { ClientTypeService, MessageService } from '../../../../core/shared/index';
import * as _ from 'lodash/index';

@Component({
  moduleId: module.id,
  selector: 'client-type',
  templateUrl: 'client-type.component.html'
})
export class ClientTypeComponent implements OnInit {
  public clientTypes: any;
  clientForm: FormGroup;
  isAddEdit: boolean = false;

  constructor(
    private clientTypeService: ClientTypeService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.clientTypes = [];
  }

  ngOnInit() {
    this.getList();
    this.clientForm = this.formBuilder.group({
      ID: [0],
      Type: ['', [Validators.required]],
    });

  }
  getList() {
    this.clientTypeService.getClientTypes().subscribe((res: any) => {
      this.clientTypes = res;
    });
  }
  onEditClicked(item: any) {
    window.scrollTo(0, 0);
    let selectedItem = _.cloneDeep(item);
    this.clientForm.setValue({
      ID: selectedItem.ID,
      Type: selectedItem.Type,
    });
    this.isAddEdit = true;
  }
  onAdd() {
    window.scrollTo(0, 0);
    this.isAddEdit = true;
  }
  onCancel() {
    this.isAddEdit = false;
    this.clientForm.reset();
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (value.ID === 0 || value.ID === null) {
      this.clientTypeService.add(value)
        .subscribe(
        results => {
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.RECORD_SAVED });
          this.getList();
        });
    } else {
      this.clientTypeService.edit(value)
        .subscribe(
        results => {
          this.getList();
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.RECORD_UPDATED });
        });
    }
    this.isAddEdit = false;
    this.clientForm.reset();
  }
}
