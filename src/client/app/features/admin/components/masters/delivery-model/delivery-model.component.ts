/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { DeliveryModelService, MessageService } from '../../../../core/shared/index';
import { DeliveryModel } from '../../../models/deliveryModel';

import * as _ from 'lodash/index';

@Component({
  moduleId: module.id,
  selector: 'delivery-model',
  templateUrl: 'delivery-model.component.html'
})
export class DeliveryModelComponent implements OnInit {
  public deliveryModels: Array<DeliveryModel>;
  deliveryForm: FormGroup;
  isAddEdit: boolean = false;

  constructor(
    private deliveryModelService: DeliveryModelService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.deliveryModels = [];
  }

  ngOnInit() {
    this.getDeliveryModels();
    this.deliveryForm = this.formBuilder.group({
      ID: [0],
      Title: ['', [Validators.required]],
      Code: ['', [Validators.required]],
    });

  }
  getDeliveryModels() {
    this.deliveryModelService.getDeliveryModelList().subscribe((res: any) => {
      this.deliveryModels = res;
    });
  }
  onEditClicked(deliveryModel: DeliveryModel) {
    window.scrollTo(0, 0);
    let selectedItem = _.cloneDeep(deliveryModel);
    this.deliveryForm.setValue({
      ID: selectedItem.ID,
      Title: selectedItem.Title,
      Code: selectedItem.Code,
    });
    this.isAddEdit = true;
  }
  onAdd() {
    window.scrollTo(0, 0);
    this.isAddEdit = true;
  }
  onCancel() {
    this.isAddEdit = false;
    this.deliveryForm.reset();
  }
  onSubmit({ value, valid }: { value: DeliveryModel, valid: boolean }) {
    if (value.ID === 0 || value.ID === null) {
      this.deliveryModelService.add(value)
        .subscribe(
        results => {
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.RECORD_SAVED });
          this.getDeliveryModels();
        });
    } else {
      this.deliveryModelService.edit(value)
        .subscribe(
        results => {
          this.getDeliveryModels();
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.RECORD_UPDATED });
        });
    }
    this.isAddEdit = false;
    this.deliveryForm.reset();
  }
}
