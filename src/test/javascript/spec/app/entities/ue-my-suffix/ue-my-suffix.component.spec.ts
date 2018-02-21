/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp1TestModule } from '../../../test.module';
import { UeMySuffixComponent } from '../../../../../../main/webapp/app/entities/ue-my-suffix/ue-my-suffix.component';
import { UeMySuffixService } from '../../../../../../main/webapp/app/entities/ue-my-suffix/ue-my-suffix.service';
import { UeMySuffix } from '../../../../../../main/webapp/app/entities/ue-my-suffix/ue-my-suffix.model';

describe('Component Tests', () => {

    describe('UeMySuffix Management Component', () => {
        let comp: UeMySuffixComponent;
        let fixture: ComponentFixture<UeMySuffixComponent>;
        let service: UeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [UeMySuffixComponent],
                providers: [
                    UeMySuffixService
                ]
            })
            .overrideTemplate(UeMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UeMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ues[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
