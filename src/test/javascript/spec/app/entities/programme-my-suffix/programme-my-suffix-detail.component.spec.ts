/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterApp1TestModule } from '../../../test.module';
import { ProgrammeMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix-detail.component';
import { ProgrammeMySuffixService } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix.service';
import { ProgrammeMySuffix } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix.model';

describe('Component Tests', () => {

    describe('ProgrammeMySuffix Management Detail Component', () => {
        let comp: ProgrammeMySuffixDetailComponent;
        let fixture: ComponentFixture<ProgrammeMySuffixDetailComponent>;
        let service: ProgrammeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [ProgrammeMySuffixDetailComponent],
                providers: [
                    ProgrammeMySuffixService
                ]
            })
            .overrideTemplate(ProgrammeMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProgrammeMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProgrammeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProgrammeMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.programme).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
