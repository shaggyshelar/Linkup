import { Directive, ElementRef, OnInit, Input, EventEmitter } from '@angular/core';
import { LoginService } from '../services/login.service';
@Directive({
    selector: '[ifAuthorize]'
})
export class IfAuthorize implements OnInit {

    @Input('ifAuthorize') permissions: Array<string>;
    private _element: HTMLElement;
    private subscription: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private loginService: LoginService, _element: ElementRef) {
        this._element = _element.nativeElement;
    }

    ngOnInit() {
        this.checkPermission();
        this.subscription = this.loginService.getAuthEmitter()
            .subscribe((value: boolean) => {
                if (value) {
                    this.checkPermission();
                }
            });

    }

    checkPermission() {
        let userHasPermissions = false;
        if (localStorage.getItem('loggedInUserPermission') !== null) {
            let loggedInUserPermission = JSON.parse(localStorage.getItem('loggedInUserPermission'));
            for (var i = 0; i < this.permissions.length; i++) {
                if (loggedInUserPermission.indexOf(this.permissions[i]) === -1) {
                    userHasPermissions = false;
                    break;
                } else {
                    userHasPermissions = true;
                }
            }
            if (!userHasPermissions) {
                this._element.style.display = 'none';
            } else {
                this._element.style.display = 'block';
            }
        } else {
            this._element.style.display = 'none';
        }
    }
}
