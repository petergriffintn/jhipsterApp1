/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterApp1TestModule } from '../../../test.module';
import { UeMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/ue-my-suffix/ue-my-suffix-detail.component';
import { UeMySuffixService } from '../../../../../../main/webapp/app/entities/ue-my-suffix/ue-my-suffix.service';
import { UeMySuffix } from '../../../../../../main/webapp/app/entities/ue-my-suffix/ue-my-suffix.model';

describe('Component Tests', () => {

    describe('UeMySuffix Management Detail Component', () => {
        let comp: UeMySuffixDetailComponent;
        let fixture: ComponentFixture<UeMySuffixDetailComponent>;
        let service: UeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [UeMySuffixDetailComponent],
                providers: [
                    UeMySuffixService
                ]
            })
            .overrideTemplate(UeMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UeMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UeMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ue).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
