/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterApp1TestModule } from '../../../test.module';
import { EeMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/ee-my-suffix/ee-my-suffix-detail.component';
import { EeMySuffixService } from '../../../../../../main/webapp/app/entities/ee-my-suffix/ee-my-suffix.service';
import { EeMySuffix } from '../../../../../../main/webapp/app/entities/ee-my-suffix/ee-my-suffix.model';

describe('Component Tests', () => {

    describe('EeMySuffix Management Detail Component', () => {
        let comp: EeMySuffixDetailComponent;
        let fixture: ComponentFixture<EeMySuffixDetailComponent>;
        let service: EeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [EeMySuffixDetailComponent],
                providers: [
                    EeMySuffixService
                ]
            })
            .overrideTemplate(EeMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EeMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EeMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ee).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
