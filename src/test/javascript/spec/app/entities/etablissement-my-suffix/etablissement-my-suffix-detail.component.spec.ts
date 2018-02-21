/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterApp1TestModule } from '../../../test.module';
import { EtablissementMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix-detail.component';
import { EtablissementMySuffixService } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix.service';
import { EtablissementMySuffix } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix.model';

describe('Component Tests', () => {

    describe('EtablissementMySuffix Management Detail Component', () => {
        let comp: EtablissementMySuffixDetailComponent;
        let fixture: ComponentFixture<EtablissementMySuffixDetailComponent>;
        let service: EtablissementMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [EtablissementMySuffixDetailComponent],
                providers: [
                    EtablissementMySuffixService
                ]
            })
            .overrideTemplate(EtablissementMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtablissementMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtablissementMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EtablissementMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.etablissement).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
