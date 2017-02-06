import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { RoleAddEditComponent } from './role-add-edit.component';
import { Observable } from 'rxjs/Observable';
import { SharedModule, AutoCompleteModule } from 'primeng/primeng';
import { RoleService } from '../../../services/role.service';
import { PermissionService } from '../../../services/permission.service';
import { Role } from '../../../models/role';
import { MessageService } from '../../../../core/shared/services/message.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function main() {

    describe('Component: RoleAddEditComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, AutoCompleteModule],
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
        it('should have a featureForm property initialize',
            async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        expect(componentInstance.params).toBe(1);
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
    editRole(role: any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    addRole(role: any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    getRoleById(id: any) {
        return new Observable<any>((observer:any) => {
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
    addPermissionToRole(permission: any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    revokePermission(permission: any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    getPermissionsByRole(id: any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    getAllPermission() {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
}
class MessageServiceStub {
    addMessage(message: any) {
        return;
    }
}

@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
}
