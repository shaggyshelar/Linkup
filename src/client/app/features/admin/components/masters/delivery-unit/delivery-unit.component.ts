/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { DeliveryUnitService, MessageService } from '../../../../core/shared/index';
import { DeliveryModel } from '../../../models/deliveryModel';

import * as _ from 'lodash/index';

@Component({
  moduleId: module.id,
  selector: 'delivery-unit',
  templateUrl: 'delivery-unit.component.html'
})
export class DeliveryUnitComponent implements OnInit {
  public deliveryUnits: Array<DeliveryModel>;
  deliveryForm: FormGroup;
  isAddEdit: boolean = false;

  constructor(
    private deliveryUnitService: DeliveryUnitService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.deliveryUnits = [];
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
    this.deliveryUnitService.getDeliveryUnitList().subscribe((res: any) => {
      this.deliveryUnits = res;
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
      this.deliveryUnitService.add(value)
        .subscribe(
        results => {
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.RECORD_SAVED });
          this.getDeliveryModels();
        });
    } else {
      this.deliveryUnitService.edit(value)
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
