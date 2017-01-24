import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { FeatureComponent } from './feature.component';
import { t } from '../../../../frameworks/test/index';
import { Observable } from 'rxjs/Observable';
import { CoreModule } from '../../../../frameworks/core/core.module';
import { DropdownModule, SharedModule, ButtonModule } from 'primeng/primeng';
import { FeatureService } from '../../services/feature.service';
import { Feature } from '../../models/feature';
import { MessageService } from '../../../core/shared/services/message.service';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

export function main() {

    t.describe('Component: FeatureComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, CoreModule, FormsModule, ReactiveFormsModule, DropdownModule, SharedModule, ButtonModule],
                declarations: [FeatureComponent, TestComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: FeatureService, useClass: FeatureServiceStub },
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
                        t.expect(componentInstance.featureForm).toBeDefined();
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
    addFeature(feature) {
        return new Observable<any>(observer => {
            observer.next();
        });
    }
    editFeature(feature) {
        return new Observable<any>(observer => {
            observer.next();
        });
    }
    getFeatures() {
        return new Observable<any>(observer => {
            observer.next();
        });
    }
    deleteFeature(id) {
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
