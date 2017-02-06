import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FooterComponent } from './footer.component';
import { Component } from '@angular/core';

export function main() {

     describe('Component: FooterComponent', () => {
         beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [FooterComponent, TestComponent],
                schemas: [NO_ERRORS_SCHEMA]
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
         it('should have a page-Footer class',
             async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement.querySelectorAll('.page-footer').length).toBe(1);
                    });
            }));
         it('should have 3 div element',
             async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        expect(fixture.nativeElement.querySelectorAll('div').length).toBe(3);
                    });
            }));
    });
};

@Component({
    selector: 'test-cmp',
    template: '<layout-footer></layout-footer>'
})
class TestComponent { }
