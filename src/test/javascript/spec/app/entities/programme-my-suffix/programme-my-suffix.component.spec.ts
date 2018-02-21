/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp1TestModule } from '../../../test.module';
import { ProgrammeMySuffixComponent } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix.component';
import { ProgrammeMySuffixService } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix.service';
import { ProgrammeMySuffix } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix.model';

describe('Component Tests', () => {

    describe('ProgrammeMySuffix Management Component', () => {
        let comp: ProgrammeMySuffixComponent;
        let fixture: ComponentFixture<ProgrammeMySuffixComponent>;
        let service: ProgrammeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [ProgrammeMySuffixComponent],
                providers: [
                    ProgrammeMySuffixService
                ]
            })
            .overrideTemplate(ProgrammeMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProgrammeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProgrammeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProgrammeMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.programmes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
