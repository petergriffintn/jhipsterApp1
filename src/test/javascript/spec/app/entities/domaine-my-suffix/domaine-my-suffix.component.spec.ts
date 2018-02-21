/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp1TestModule } from '../../../test.module';
import { DomaineMySuffixComponent } from '../../../../../../main/webapp/app/entities/domaine-my-suffix/domaine-my-suffix.component';
import { DomaineMySuffixService } from '../../../../../../main/webapp/app/entities/domaine-my-suffix/domaine-my-suffix.service';
import { DomaineMySuffix } from '../../../../../../main/webapp/app/entities/domaine-my-suffix/domaine-my-suffix.model';

describe('Component Tests', () => {

    describe('DomaineMySuffix Management Component', () => {
        let comp: DomaineMySuffixComponent;
        let fixture: ComponentFixture<DomaineMySuffixComponent>;
        let service: DomaineMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [DomaineMySuffixComponent],
                providers: [
                    DomaineMySuffixService
                ]
            })
            .overrideTemplate(DomaineMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DomaineMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DomaineMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DomaineMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.domaines[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
