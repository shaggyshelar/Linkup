
/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { AchievementService } from '../../services/achievement.service';
import { Achievement } from '../../models/achievement';
import { AchievementFormValidation } from '../../models/validation/achievementFormValidation';
import { MessageService } from '../../../core/shared/services/message.service';

/** Other Module Dependencies */
//import * as _ from 'lodash';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'achievement',
    templateUrl: 'achievement.component.html',
    styleUrls: ['achievement.component.css']
})
export class AchievementComponent implements OnInit {
    showDiv: boolean;
    achievementForm: FormGroup;
    public achievements: Observable<Achievement>;

    constructor(private formBuilder: FormBuilder, private achievementService: AchievementService, private messageService: MessageService) {
        this.showDiv = true;
    }
    ngOnInit(): void {
        this.achievements = this.achievementService.getAchievements();

        this.achievementForm = this.formBuilder.group({
            id: [null],
            description: ['', [Validators.required]]
        });
    }
    onAddClick() {
        this.showDiv = false;
        this.achievementForm.reset();
    }

    onSubmit({ value, valid }: { value: AchievementFormValidation, valid: boolean }) {
        if (value.id) {
            let params = {
                ID: value.id,
                Name: value.description
            };
            this.achievementService.updateAchievement(value.id, params).subscribe((res:any) => {
                if (res) {
                    this.achievements = this.achievementService.getAchievements();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Achievement updated successfully.' });
                    this.showDiv = true;
                }
            });
        } else {
            let params = {
                Name: value.description
            };
            this.achievementService.addAchievement(params).subscribe(res => {
                if (res) {
                    this.achievements = this.achievementService.getAchievements();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Achievement saved successfully.' });
                    this.showDiv = true;
                }
            });
        }
    }
    cancel() {
        this.showDiv = true;
        this.achievementForm.reset();
    }
    editAchievement(achievementData:any) {
        this.achievementForm.setValue({
            id: achievementData.ID,
            description: achievementData.Name
        });
        this.showDiv = false;
    }
}
