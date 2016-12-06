import { OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'authenticate',
    templateUrl: 'auth.component.html'
})
export class AuthComponent {
    constructor(private authService: AuthService) {
    }

    login() {
        if (this.authService.authenticate('', '')) {
            console.log('Auth Successful');
            //Perform Post authentication cleanup tasks
        };
    }
}
