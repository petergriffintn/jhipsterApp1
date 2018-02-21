/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterApp1TestModule } from '../../../test.module';
import { UniversiteMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/universite-my-suffix/universite-my-suffix-detail.component';
import { UniversiteMySuffixService } from '../../../../../../main/webapp/app/entities/universite-my-suffix/universite-my-suffix.service';
import { UniversiteMySuffix } from '../../../../../../main/webapp/app/entities/universite-my-suffix/universite-my-suffix.model';

describe('Component Tests', () => {

    describe('UniversiteMySuffix Management Detail Component', () => {
        let comp: UniversiteMySuffixDetailComponent;
        let fixture: ComponentFixture<UniversiteMySuffixDetailComponent>;
        let service: UniversiteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [UniversiteMySuffixDetailComponent],
                providers: [
                    UniversiteMySuffixService
                ]
            })
            .overrideTemplate(UniversiteMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UniversiteMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UniversiteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UniversiteMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.universite).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
