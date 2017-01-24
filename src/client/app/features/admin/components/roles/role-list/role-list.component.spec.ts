import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { RoleListComponent } from './role-list.component';
import { t } from '../../../../../frameworks/test/index';
import { Observable } from 'rxjs/Observable';
import { CoreModule } from '../../../../../frameworks/core/core.module';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role';
import { MessageService } from '../../../../core/shared/services/message.service';

export function main() {

    t.describe('Component: RoleListComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule, DataTableModule, CoreModule],
                declarations: [RoleListComponent, TestComponent, RouterLinkStubDirective],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: RoleService, useClass: RoleServiceStub },
                    { provide: MessageService, useClass: MessageServiceStub },
                ]
            });
        });
        t.it('should have a defined component',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.e(fixture.nativeElement).toBeTruthy();
                        t.e(TestComponent).toBeDefined();
                    });
            }));
        t.it('should have a featureForm property initialize',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        t.expect(componentInstance.roleList).toBeDefined();
                    });
            }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<admin-role-list></admin-role-list>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { return url; }
}
class RoleServiceStub {
    getRoles() {
        return new Observable<any>(observer => {
            observer.next();
        });
    }
    deleteRole(id) {
        return new Observable<any>(observer => {
            observer.next();
        });
    }
}
class MessageServiceStub {
    addMessage(message) {
        return;
    }
}
@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
}
