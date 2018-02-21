/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterApp1TestModule } from '../../../test.module';
import { MentionMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/mention-my-suffix/mention-my-suffix-detail.component';
import { MentionMySuffixService } from '../../../../../../main/webapp/app/entities/mention-my-suffix/mention-my-suffix.service';
import { MentionMySuffix } from '../../../../../../main/webapp/app/entities/mention-my-suffix/mention-my-suffix.model';

describe('Component Tests', () => {

    describe('MentionMySuffix Management Detail Component', () => {
        let comp: MentionMySuffixDetailComponent;
        let fixture: ComponentFixture<MentionMySuffixDetailComponent>;
        let service: MentionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [MentionMySuffixDetailComponent],
                providers: [
                    MentionMySuffixService
                ]
            })
            .overrideTemplate(MentionMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MentionMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MentionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MentionMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mention).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
