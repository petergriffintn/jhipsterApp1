/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp1TestModule } from '../../../test.module';
import { EeMySuffixComponent } from '../../../../../../main/webapp/app/entities/ee-my-suffix/ee-my-suffix.component';
import { EeMySuffixService } from '../../../../../../main/webapp/app/entities/ee-my-suffix/ee-my-suffix.service';
import { EeMySuffix } from '../../../../../../main/webapp/app/entities/ee-my-suffix/ee-my-suffix.model';

describe('Component Tests', () => {

    describe('EeMySuffix Management Component', () => {
        let comp: EeMySuffixComponent;
        let fixture: ComponentFixture<EeMySuffixComponent>;
        let service: EeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [EeMySuffixComponent],
                providers: [
                    EeMySuffixService
                ]
            })
            .overrideTemplate(EeMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EeMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ees[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
