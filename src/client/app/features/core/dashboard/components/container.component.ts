/** Angular Dependencies */
import { OnInit } from '@angular/core';

import { Component } from '@angular/core';

/** Component Definition */
@Component({
    moduleId: module.id,
    selector: 'dashboard-container',
    templateUrl: 'container.component.html'
})
export class DashboardContainerComponent implements OnInit {

    ngOnInit() {
        window['App'].init();
        window['Layout'].init();
    }
}
