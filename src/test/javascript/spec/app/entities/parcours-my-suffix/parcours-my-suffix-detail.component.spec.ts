/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterApp1TestModule } from '../../../test.module';
import { ParcoursMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/parcours-my-suffix/parcours-my-suffix-detail.component';
import { ParcoursMySuffixService } from '../../../../../../main/webapp/app/entities/parcours-my-suffix/parcours-my-suffix.service';
import { ParcoursMySuffix } from '../../../../../../main/webapp/app/entities/parcours-my-suffix/parcours-my-suffix.model';

describe('Component Tests', () => {

    describe('ParcoursMySuffix Management Detail Component', () => {
        let comp: ParcoursMySuffixDetailComponent;
        let fixture: ComponentFixture<ParcoursMySuffixDetailComponent>;
        let service: ParcoursMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [ParcoursMySuffixDetailComponent],
                providers: [
                    ParcoursMySuffixService
                ]
            })
            .overrideTemplate(ParcoursMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParcoursMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParcoursMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ParcoursMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.parcours).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
