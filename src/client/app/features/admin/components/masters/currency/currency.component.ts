/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { CurrencyService, MessageService } from '../../../../core/shared/index';
import { Currency } from '../../../models/currency';

import * as _ from 'lodash/index';

@Component({
  moduleId: module.id,
  selector: 'currency-master',
  templateUrl: 'currency.component.html'
})
export class CurrencyComponent implements OnInit {
  public currencyList: Array<Currency>;
  currencyForm: FormGroup;
  isAddEdit: boolean = false;

  constructor(
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.currencyList = [];
  }

  ngOnInit() {
    this.getCurrnecy();
    this.currencyForm = this.formBuilder.group({
      ID: [0],
      Name: ['', [Validators.required]],
      Code: ['', [Validators.required]],
    });
  }
  getCurrnecy() {
    this.currencyService.getCurrencyList().subscribe((res: any) => {
      this.currencyList = res;
    });
  }
  onEditClicked(deliveryModel: Currency) {
    window.scrollTo(0, 0);
    let selectedItem = _.cloneDeep(deliveryModel);
    this.currencyForm.setValue({
      ID: selectedItem.ID,
      Name: selectedItem.Name,
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
    this.currencyForm.reset();
  }
  onSubmit({ value, valid }: { value: Currency, valid: boolean }) {
    if (value.ID === 0 || value.ID === null) {
      this.currencyService.add(value)
        .subscribe(
        results => {
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.RECORD_SAVED });
          this.getCurrnecy();
        });
    } else {
      this.currencyService.edit(value)
        .subscribe(
        results => {
          this.getCurrnecy();
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.RECORD_UPDATED });
        });
    }
    this.isAddEdit = false;
    this.currencyForm.reset();
  }
}
