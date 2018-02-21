/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp1TestModule } from '../../../test.module';
import { EtablissementMySuffixComponent } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix.component';
import { EtablissementMySuffixService } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix.service';
import { EtablissementMySuffix } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix.model';

describe('Component Tests', () => {

    describe('EtablissementMySuffix Management Component', () => {
        let comp: EtablissementMySuffixComponent;
        let fixture: ComponentFixture<EtablissementMySuffixComponent>;
        let service: EtablissementMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [EtablissementMySuffixComponent],
                providers: [
                    EtablissementMySuffixService
                ]
            })
            .overrideTemplate(EtablissementMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtablissementMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtablissementMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EtablissementMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.etablissements[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
