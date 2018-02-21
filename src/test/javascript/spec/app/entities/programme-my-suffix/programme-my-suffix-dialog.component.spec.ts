/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp1TestModule } from '../../../test.module';
import { ProgrammeMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix-dialog.component';
import { ProgrammeMySuffixService } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix.service';
import { ProgrammeMySuffix } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix.model';
import { SpecialiteMySuffixService } from '../../../../../../main/webapp/app/entities/specialite-my-suffix';

describe('Component Tests', () => {

    describe('ProgrammeMySuffix Management Dialog Component', () => {
        let comp: ProgrammeMySuffixDialogComponent;
        let fixture: ComponentFixture<ProgrammeMySuffixDialogComponent>;
        let service: ProgrammeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [ProgrammeMySuffixDialogComponent],
                providers: [
                    SpecialiteMySuffixService,
                    ProgrammeMySuffixService
                ]
            })
            .overrideTemplate(ProgrammeMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProgrammeMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProgrammeMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProgrammeMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.programme = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'programmeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProgrammeMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.programme = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'programmeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
