import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { RoleListComponent } from './role-list.component';
import { Observable } from 'rxjs/Observable';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role';
import { MessageService } from '../../../../core/shared/services/message.service';

export function main() {

    describe('Component: RoleListComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule, DataTableModule],
                declarations: [RoleListComponent, TestComponent, RouterLinkStubDirective],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: RoleService, useClass: RoleServiceStub },
                    { provide: MessageService, useClass: MessageServiceStub },
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
                        expect(componentInstance.roleList).toBeDefined();
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
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    deleteRole(id: any) {
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
