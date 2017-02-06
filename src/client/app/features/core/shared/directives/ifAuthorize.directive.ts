import { Directive, ElementRef, OnInit, Input } from '@angular/core';
@Directive({
    selector: '[ifAuthorize]'
})
export class IfAuthorizeDirective implements OnInit {

    @Input() ifAuthorize: Array<string>;
    private _element: HTMLElement;
    constructor( _element: ElementRef) {
        this._element = _element.nativeElement;
    }

    ngOnInit() {
        this.checkPermission();
    }

    checkPermission() {
        let userHasPermissions = false;
        if (localStorage.getItem('loggedInUserPermission') !== null) {
            let loggedInUserPermission = JSON.parse(localStorage.getItem('loggedInUserPermission'));
            for (var i = 0; i < this.ifAuthorize.length; i++) {
                if (loggedInUserPermission.indexOf(this.ifAuthorize[i]) === -1) {
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
