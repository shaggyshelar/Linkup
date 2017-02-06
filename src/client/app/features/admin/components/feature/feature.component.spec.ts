import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';;
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { FeatureComponent } from './feature.component';
import { Observable } from 'rxjs/Observable';
import { DropdownModule, SharedModule, ButtonModule } from 'primeng/primeng';
import { FeatureService } from '../../services/feature.service';
import { Feature } from '../../models/feature';
import { MessageService } from '../../../core/shared/services/message.service';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

export function main() {

    describe('Component: FeatureComponent', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownModule, SharedModule, ButtonModule],
                declarations: [FeatureComponent, TestComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: FeatureService, useClass: FeatureServiceStub },
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
                        expect(componentInstance.featureForm).toBeDefined();
                    });
            }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<admin-feature></admin-feature>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { return url; }
}

class FeatureServiceStub {
    addFeature(feature:any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    editFeature(feature:any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    getFeatures() {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
    deleteFeature(id:any) {
        return new Observable<any>((observer:any) => {
            observer.next();
        });
    }
}

class MessageServiceStub {
    addMessage(message:any) {
        return;
    }
}
