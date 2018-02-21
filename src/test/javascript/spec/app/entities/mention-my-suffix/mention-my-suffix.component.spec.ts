/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp1TestModule } from '../../../test.module';
import { MentionMySuffixComponent } from '../../../../../../main/webapp/app/entities/mention-my-suffix/mention-my-suffix.component';
import { MentionMySuffixService } from '../../../../../../main/webapp/app/entities/mention-my-suffix/mention-my-suffix.service';
import { MentionMySuffix } from '../../../../../../main/webapp/app/entities/mention-my-suffix/mention-my-suffix.model';

describe('Component Tests', () => {

    describe('MentionMySuffix Management Component', () => {
        let comp: MentionMySuffixComponent;
        let fixture: ComponentFixture<MentionMySuffixComponent>;
        let service: MentionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [MentionMySuffixComponent],
                providers: [
                    MentionMySuffixService
                ]
            })
            .overrideTemplate(MentionMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MentionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MentionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MentionMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mentions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
