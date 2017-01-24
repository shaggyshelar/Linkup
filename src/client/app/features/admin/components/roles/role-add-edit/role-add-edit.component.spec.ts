import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { RoleAddEditComponent } from './role-add-edit.component';
import { t } from '../../../../../frameworks/test/index';
import { Observable } from 'rxjs/Observable';
import { CoreModule } from '../../../../../frameworks/core/core.module';
import { SharedModule, AutoCompleteModule } from 'primeng/primeng';
import { RoleService } from '../../../services/role.service';
import { PermissionService } from '../../../services/permission.service';
import { Role } from '../../../models/role';
import { MessageService } from '../../../../core/shared/services/message.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function main() {

    t.describe('Component: RoleAddEditComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, SharedModule, CoreModule, FormsModule, ReactiveFormsModule, AutoCompleteModule],
                declarations: [RoleAddEditComponent, TestComponent, RouterLinkStubDirective],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: RoleService, useClass: RoleServiceStub },
                    { provide: PermissionService, useClass: PermissionServiceStub },
                    { provide: MessageService, useClass: MessageServiceStub },
                    { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'roleId': 1 }]) } }
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
                        t.expect(componentInstance.params).toBe(1);
                    });
            }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<role-add-edit></role-add-edit>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { return url; }
}
class RoleServiceStub {
    editRole(role) {
        return new Observable<any>(observer => {
            observer.next();
        });
    }
    addRole(role) {
        return new Observable<any>(observer => {
            observer.next();
        });
    }
    getRoleById(id) {
        return new Observable<any>(observer => {
            observer.next({
                ID: 1,
                Name: 'SuperAdmin'
            });
        });
    }
}
var roleList = [{
    ID: 1,
    Name: 'SuperAdmin'
},
{
    ID: 2,
    Name: 'Management Team',
}];
class PermissionServiceStub {
    addPermissionToRole(permission) {
        return new Observable<any>(observer => {
            observer.next();
        });
    }
    revokePermission(permission) {
        return new Observable<any>(observer => {
            observer.next();
        });
    }
    getPermissionsByRole(id) {
        return new Observable<any>(observer => {
            observer.next();
        });
    }
    getAllPermission() {
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
