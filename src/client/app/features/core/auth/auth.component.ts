import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Message } from 'primeng/primeng';
import { MessageService } from '../shared/services/message.service';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    moduleId: module.id,
    selector: 'authenticate-user',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit {
    msgs: Message[] = [];
    public errorMessage: string;
    showError: boolean = false;
    public model: User;
    queryUrl:'';
    constructor(private _router: Router,
            private route: ActivatedRoute,
            private authService: AuthService,
            private messageService: MessageService) {
        this.model = new User('', '');
    }

    ngOnInit() {
        if (localStorage.getItem('accessToken') !== null) {
            this._router.navigate(['/']);
        }
      if(this.messageService.isSessionTimeout) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Failed', detail: MessageService.SESSION_TIMEOUT  });
            this.messageService.setSessionTimeOutMessage(false);
       }
       this.route.queryParams.subscribe(params => {
                 if(params['url']) {
                    this.queryUrl=params['url'];
                 }
             } );
    }

    login() {
        this.showError = false;
        this.authService.authenticate(this.model)
            .subscribe(
            results => {
                this.getLoggedInUserPermission();
            },
            error => {
                this.showError = true;
                this.errorMessage = error;
            });
    }
    getLoggedInUserPermission(): void {
        this.authService.getLoggedInUserPermission()
            .subscribe(
            results => {
                this.getCurrentUserDetails();
            });
    };
    getCurrentUserDetails(): void {
        this.authService.getCurrentUserDetails()
            .subscribe(
            results => {
                if(this.queryUrl) {
                    this._router.navigate([this.queryUrl]);
                } else {
                  this._router.navigate(['/']);
                }
            });
    };
}

class User {
    constructor(
        public Password: string,
        public UserName: string
    ) { }
}
