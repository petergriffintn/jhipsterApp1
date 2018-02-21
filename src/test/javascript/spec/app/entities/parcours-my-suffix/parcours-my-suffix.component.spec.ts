/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp1TestModule } from '../../../test.module';
import { ParcoursMySuffixComponent } from '../../../../../../main/webapp/app/entities/parcours-my-suffix/parcours-my-suffix.component';
import { ParcoursMySuffixService } from '../../../../../../main/webapp/app/entities/parcours-my-suffix/parcours-my-suffix.service';
import { ParcoursMySuffix } from '../../../../../../main/webapp/app/entities/parcours-my-suffix/parcours-my-suffix.model';

describe('Component Tests', () => {

    describe('ParcoursMySuffix Management Component', () => {
        let comp: ParcoursMySuffixComponent;
        let fixture: ComponentFixture<ParcoursMySuffixComponent>;
        let service: ParcoursMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [ParcoursMySuffixComponent],
                providers: [
                    ParcoursMySuffixService
                ]
            })
            .overrideTemplate(ParcoursMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParcoursMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParcoursMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ParcoursMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.parcours[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
