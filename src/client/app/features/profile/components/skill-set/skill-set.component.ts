/** Angular Dependencies */
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Third Party Dependencies */
import { SelectItem } from 'primeng/primeng';
/** Module Level Dependencies */
import { Skill } from '../../models/skill';
import { SkillService } from '../../services/skill.service';
import { MessageService } from '../../../core/shared/services/message.service';
import { SkillSetFormValidation } from '../../models/validation/skillSetFormValidation';
import { SkillMasterService } from '../../../core/shared/services/master/skillMaster.service';

/** Other Module Dependencies */
import * as _ from 'lodash/index';

/** Component Declaration */
@Component({
  moduleId: module.id,
  selector: 'skill-set',
  templateUrl: 'skill-set.component.html',
  styleUrls: ['skill-set.component.css']
})
export class SkillSetComponent implements OnInit {
  public skillSet: Observable<Skill>;
  public skillMaster: Observable<any>;
  skillTypes: SelectItem[];
  showDiv: boolean;
  skillSetForm: FormGroup;

  constructor(
    private router: Router, private formBuilder: FormBuilder, private skillService: SkillService,
    private messageService: MessageService, private skillMasterService: SkillMasterService) {
    this.skillTypes = [];
    this.showDiv = true;
  }

  ngOnInit(): void {

    this.skillMaster = this.skillMasterService.getSkillMaster();
    this.skillMaster.subscribe(result => {
      if (result) {
        this.skillTypes.push({ label: 'Select Skill Type', value: null });
        result.forEach((element:any) => {
          this.skillTypes.push({
            label: element.Name,
            value: {
              id: element.ID,
              name: element.Name
            }
          });
        });
      }
    });

    this.skillSetForm = this.formBuilder.group({
      id: [null],
      skillType: ['', [Validators.required]],
      skills: ['', [Validators.required]]
    });

    this.skillSet = this.skillService.getSkills();
  }

  onAddClick() {
    this.showDiv = false;
    this.skillSetForm.reset();
  }

  onSubmit({ value, valid }: { value: SkillSetFormValidation, valid: boolean }) {
    if (value.id) {
      let params = {
        ID: value.id,
        Name: value.skills,
        Type: value.skillType.name
      };
      this.skillService.updateSkill(value.id, params).subscribe(res => {
        if (res) {
          this.skillSet = this.skillService.getSkills();
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Skill updated successfully.' });
          this.showDiv = true;
        }
      });
    } else {
      let params = {
        Name: value.skills,
        Type: value.skillType.name
      };
      this.skillService.addSkill(params).subscribe(res => {
        if (res) {
          this.skillSet = this.skillService.getSkills();
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Skill saved successfully.' });
          this.showDiv = true;
        }
      });
    }
  }

  cancel() {
    this.showDiv = true;
    this.skillSetForm.reset();
  }
  editSkillSetData(skillSetData:any) {
    this.showDiv = false;
    this.skillSetForm.setValue({
      id: skillSetData.ID,
      skillType: _.find(this.skillTypes, ['label', skillSetData.Type.Name]).value,
      skills: skillSetData.Name
    });
  }
}
