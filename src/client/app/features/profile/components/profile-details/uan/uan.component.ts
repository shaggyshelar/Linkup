/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { Uan } from '../../../models/uan';
import { UanService } from '../../../services/uan.service';
import { MessageService } from '../../../../core/shared/services/message.service';
import { UanFormValidation } from '../../../models/validation/uanFormValidation';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'UAN',
    templateUrl: 'uan.component.html',
    styleUrls: ['uan.component.css']
})
export class UANComponent implements OnInit {
    showDiv: boolean;
    public uanData: Observable<Uan>;
    uanForm: FormGroup;
    uan: any;

    constructor(private messageService: MessageService, private formBuilder: FormBuilder, private uanService: UanService) {
        this.uan = [];
        this.showDiv = true;
    }

    ngOnInit(): void {
        this.uanForm = this.formBuilder.group({
            id: null,
            number: ['', [Validators.required]],
            fromESPL: false
        });
        this.uanData = this.uanService.getUan();
        this.uanData.subscribe(result => {
            this.uan = result ? result : [];
        });
    }

    onSubmit({ value, valid }: { value: UanFormValidation, valid: boolean }) {
        if (value.id) {
            let params = {
                ID: value.id,
                Number: value.number,
                FromESPL: value.fromESPL,
            };
            this.uanService.updateUan(value.id, params).subscribe(res => {
                if (res) {
                    this.uanData = this.uanService.getUan();
                    this.uanData.subscribe(result => {
                        this.uan = result ? result : [];
                    });
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'UAN updated successfully.' });
                    this.showDiv = true;
                }
            });
        } else {
            let params = {
                Number: value.number,
                FromESPL: value.fromESPL,
            };
            this.uanService.addUan(params).subscribe(res => {
                if (res) {
                    this.uanData = this.uanService.getUan();
                    this.uanData.subscribe(result => {
                        this.uan = result ? result : [];
                    });
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'UAN saved successfully.' });
                    this.showDiv = true;
                }
            });
        }
    }

    cancel() {
        this.showDiv = true;
    }

    add() {
        this.showDiv = false;
        if (this.uan.length > 0) {
            this.uanForm.setValue({
                id: this.uan[0].ID,
                number: this.uan[0].Number,
                fromESPL: this.uan[0].FromESPL
            });
        }
    }
}
