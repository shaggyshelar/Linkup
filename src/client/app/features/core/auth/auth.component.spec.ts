import { async, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { AuthComponent } from './auth.component';
import { Observable } from 'rxjs/Observable';
import { DropdownModule, SharedModule, ButtonModule } from 'primeng/primeng';
import { AuthService } from './auth.service';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

var authenticateUserName = '';
export function main() {

    describe('Component: AuthComponent', () => {
       beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ FormsModule, SharedModule],
                declarations: [AuthComponent, TestComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: AuthService, useClass: AuthServiceStub }
                ]
            });
        });
        it('should have a defined component',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement).toBeTruthy();
                        expect(TestComponent).toBeDefined();
                    });
            }));
         it('should have a model property initialize',
             async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        expect(componentInstance.model.UserName).toBe('');
                    });
            }));
         it('should have a call login method',
             async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        componentInstance.model.UserName = 'admin';
                        componentInstance.login();
                        expect(authenticateUserName).toBe('admin');
                    });
            }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<authenticate-user></authenticate-user>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { return url; }
}

class AuthServiceStub {
    authenticate(credential:any) {
        authenticateUserName = credential.UserName;
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    getLoggedInUserPermission() {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
}
