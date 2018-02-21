/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp1TestModule } from '../../../test.module';
import { SpecialiteMySuffixComponent } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix.component';
import { SpecialiteMySuffixService } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix.service';
import { SpecialiteMySuffix } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix.model';

describe('Component Tests', () => {

    describe('SpecialiteMySuffix Management Component', () => {
        let comp: SpecialiteMySuffixComponent;
        let fixture: ComponentFixture<SpecialiteMySuffixComponent>;
        let service: SpecialiteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [SpecialiteMySuffixComponent],
                providers: [
                    SpecialiteMySuffixService
                ]
            })
            .overrideTemplate(SpecialiteMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpecialiteMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpecialiteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SpecialiteMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.specialites[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
