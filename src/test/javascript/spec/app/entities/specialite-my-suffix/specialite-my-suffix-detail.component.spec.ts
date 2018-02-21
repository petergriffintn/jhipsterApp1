/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterApp1TestModule } from '../../../test.module';
import { SpecialiteMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix-detail.component';
import { SpecialiteMySuffixService } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix.service';
import { SpecialiteMySuffix } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix.model';

describe('Component Tests', () => {

    describe('SpecialiteMySuffix Management Detail Component', () => {
        let comp: SpecialiteMySuffixDetailComponent;
        let fixture: ComponentFixture<SpecialiteMySuffixDetailComponent>;
        let service: SpecialiteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [SpecialiteMySuffixDetailComponent],
                providers: [
                    SpecialiteMySuffixService
                ]
            })
            .overrideTemplate(SpecialiteMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpecialiteMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpecialiteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SpecialiteMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.specialite).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
