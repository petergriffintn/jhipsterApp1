/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp1TestModule } from '../../../test.module';
import { DiplomeMySuffixComponent } from '../../../../../../main/webapp/app/entities/diplome-my-suffix/diplome-my-suffix.component';
import { DiplomeMySuffixService } from '../../../../../../main/webapp/app/entities/diplome-my-suffix/diplome-my-suffix.service';
import { DiplomeMySuffix } from '../../../../../../main/webapp/app/entities/diplome-my-suffix/diplome-my-suffix.model';

describe('Component Tests', () => {

    describe('DiplomeMySuffix Management Component', () => {
        let comp: DiplomeMySuffixComponent;
        let fixture: ComponentFixture<DiplomeMySuffixComponent>;
        let service: DiplomeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [DiplomeMySuffixComponent],
                providers: [
                    DiplomeMySuffixService
                ]
            })
            .overrideTemplate(DiplomeMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiplomeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiplomeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DiplomeMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.diplomes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
