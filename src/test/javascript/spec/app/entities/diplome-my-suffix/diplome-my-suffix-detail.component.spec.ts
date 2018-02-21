/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterApp1TestModule } from '../../../test.module';
import { DiplomeMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/diplome-my-suffix/diplome-my-suffix-detail.component';
import { DiplomeMySuffixService } from '../../../../../../main/webapp/app/entities/diplome-my-suffix/diplome-my-suffix.service';
import { DiplomeMySuffix } from '../../../../../../main/webapp/app/entities/diplome-my-suffix/diplome-my-suffix.model';

describe('Component Tests', () => {

    describe('DiplomeMySuffix Management Detail Component', () => {
        let comp: DiplomeMySuffixDetailComponent;
        let fixture: ComponentFixture<DiplomeMySuffixDetailComponent>;
        let service: DiplomeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [DiplomeMySuffixDetailComponent],
                providers: [
                    DiplomeMySuffixService
                ]
            })
            .overrideTemplate(DiplomeMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiplomeMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiplomeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DiplomeMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.diplome).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
