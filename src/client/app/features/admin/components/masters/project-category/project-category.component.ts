/** Angular Dependencies */
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Framework Dependencies */
import { Component } from '@angular/core';

/** Module Level Dependencies */
import { ProjectCategoryService, MessageService } from '../../../../core/shared/index';
import { ProjectCategory } from '../../../models/project-category';

import * as _ from 'lodash/index';

@Component({
  moduleId: module.id,
  selector: 'project-category',
  templateUrl: 'project-category.component.html'
})
export class ProjectCategoryComponent implements OnInit {
  public projectCategoryList: Array<ProjectCategory>;
  projectForm: FormGroup;
  isAddEdit: boolean = false;

  constructor(
    private projectCategoryService: ProjectCategoryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.projectCategoryList = [];
  }

  ngOnInit() {
    this.getDeliveryModels();
    this.projectForm = this.formBuilder.group({
      ID: [0],
      Category: ['', [Validators.required]],
      CategoryID: ['', [Validators.required]],
    });

  }
  getDeliveryModels() {
    this.projectCategoryService.getProjectCategories().subscribe((res: any) => {
      this.projectCategoryList = res;
    });
  }
  onEditClicked(deliveryModel: ProjectCategory) {
    window.scrollTo(0, 0);
    let selectedItem = _.cloneDeep(deliveryModel);
    this.projectForm.setValue({
      ID: selectedItem.ID,
      Category: selectedItem.Category,
      CategoryID: selectedItem.CategoryID,
    });
    this.isAddEdit = true;
  }
  onAdd() {
    window.scrollTo(0, 0);
    this.isAddEdit = true;
  }
  onCancel() {
    this.isAddEdit = false;
    this.projectForm.reset();
  }
  onSubmit({ value, valid }: { value: ProjectCategory, valid: boolean }) {
    if (value.ID === 0 || value.ID === null) {
      this.projectCategoryService.add(value)
        .subscribe(
        results => {
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.RECORD_SAVED });
          this.getDeliveryModels();
        });
    } else {
      this.projectCategoryService.edit(value)
        .subscribe(
        results => {
          this.getDeliveryModels();
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: MessageService.RECORD_UPDATED });
        });
    }
    this.isAddEdit = false;
    this.projectForm.reset();
  }
}
