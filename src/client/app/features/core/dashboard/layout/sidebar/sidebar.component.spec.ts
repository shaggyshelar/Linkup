import { async,TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';

var isAuthneticatedStatus = false;

export function main() {

     describe('Component: SidebarComponent', () => {
         beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ CommonModule ],
                schemas: [NO_ERRORS_SCHEMA],
                declarations: [SidebarComponent, TestComponent, RouterLinkStubDirective, IfAuthorizeStubDirective],
                providers: [
                    { provide: AuthService, useValue: new MockLoginService() },
                    { provide: Router, useClass: RouterStub },
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
         it('should have a page-sidebar-wrapper class',
             async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                         expect(fixture.nativeElement.querySelectorAll('.page-sidebar-wrapper').length).toBe(1);
                    });
            }));
         it('should have isUserMenuOpen property set to false',
             async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        expect(componentInstance.isUserMenuOpen).toBe(false);
                    });
            }));
         it('should call logout method',
             async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        isAuthneticatedStatus = false;
                        componentInstance.logout();
                        expect(isAuthneticatedStatus).toBe(true);
                    });
            }));
         it('should have isUserMenuOpen property set to true',
             async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        expect(componentInstance.isUserMenuOpen).toBe(false);
                        componentInstance.toggleUserMenu();
                        expect(componentInstance.isUserMenuOpen).toBe(true);
                    });
            }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<sidebar-menu></sidebar-menu>'
})
class TestComponent { }

class MockLoginService {
    public logout() {
        isAuthneticatedStatus = true;
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
}
class RouterStub {
    navigate(url: any) { return url; }
}
class LogServiceStub {
    debug(message: any) {
        return message;
    }
}

@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
}

@Directive({
    selector: '[ifAuthorize]',
})
export class IfAuthorizeStubDirective {
}
