/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp1TestModule } from '../../../test.module';
import { UniversiteMySuffixComponent } from '../../../../../../main/webapp/app/entities/universite-my-suffix/universite-my-suffix.component';
import { UniversiteMySuffixService } from '../../../../../../main/webapp/app/entities/universite-my-suffix/universite-my-suffix.service';
import { UniversiteMySuffix } from '../../../../../../main/webapp/app/entities/universite-my-suffix/universite-my-suffix.model';

describe('Component Tests', () => {

    describe('UniversiteMySuffix Management Component', () => {
        let comp: UniversiteMySuffixComponent;
        let fixture: ComponentFixture<UniversiteMySuffixComponent>;
        let service: UniversiteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [UniversiteMySuffixComponent],
                providers: [
                    UniversiteMySuffixService
                ]
            })
            .overrideTemplate(UniversiteMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UniversiteMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UniversiteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UniversiteMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.universites[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
