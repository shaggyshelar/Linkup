import { async,TestBed } from '@angular/core/testing';
import { Component,Directive, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TopNavigationBarComponent } from './top-navigation-bar.component';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

var isAuthneticatedStatus = false;
export function main() {

     describe('Component: TopNavigationBarComponent', () => {
         beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ CommonModule ],
                declarations: [TopNavigationBarComponent, TestComponent, RouterLinkStubDirective],
                providers: [
                    { provide: AuthService, useValue: new MockLoginService() },
                    { provide: Router, useClass: RouterStub },
                ],
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
         it('should have a top-menu class',
             async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                         expect(fixture.nativeElement.querySelectorAll('.top-menu').length).toBe(1);
                    });
            }));
         it('should have a two external links',
             async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
                        let links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
                        expect(links[0].routerLink).toBe('/profile');
                        expect(links[1].routerLink).toBe('/change-password');
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
    });
};


@Component({
    selector: 'test-cmp',
    template: '<top-navigation-bar></top-navigation-bar>'
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


@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
    @Input() routerLink: any;
}
