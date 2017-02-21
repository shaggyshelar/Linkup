/** Angular Dependencies */
import { OnInit } from '@angular/core';

import { Component } from '@angular/core';

import { Message } from 'primeng/primeng';
import { MessageService } from '../../shared/services/message.service';
/** Component Definition */
@Component({
    moduleId: module.id,
    selector: 'dashboard-container',
    templateUrl: 'container.component.html'
})
export class DashboardContainerComponent implements OnInit {
    msgs: Message[] = [];
    constructor(private messageService: MessageService) {
    }
    ngOnInit() {
        let windowRef= this._window();
        (<any>window)['App'].init();
        (<any>window)['Layout'].init();
        // windowRef['App'].init();
        // windowRef['Layout'].init();
        this.messageService.getMessages()
            .subscribe((value: Object) => {
                this.msgs = [];
                this.msgs.push(value);
            });
    }
    _window() : any {
     return window;
    }
}
