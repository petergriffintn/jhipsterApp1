/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp1TestModule } from '../../../test.module';
import { ParcoursMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/parcours-my-suffix/parcours-my-suffix-dialog.component';
import { ParcoursMySuffixService } from '../../../../../../main/webapp/app/entities/parcours-my-suffix/parcours-my-suffix.service';
import { ParcoursMySuffix } from '../../../../../../main/webapp/app/entities/parcours-my-suffix/parcours-my-suffix.model';
import { DiplomeMySuffixService } from '../../../../../../main/webapp/app/entities/diplome-my-suffix';
import { MentionMySuffixService } from '../../../../../../main/webapp/app/entities/mention-my-suffix';

describe('Component Tests', () => {

    describe('ParcoursMySuffix Management Dialog Component', () => {
        let comp: ParcoursMySuffixDialogComponent;
        let fixture: ComponentFixture<ParcoursMySuffixDialogComponent>;
        let service: ParcoursMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [ParcoursMySuffixDialogComponent],
                providers: [
                    DiplomeMySuffixService,
                    MentionMySuffixService,
                    ParcoursMySuffixService
                ]
            })
            .overrideTemplate(ParcoursMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParcoursMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParcoursMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ParcoursMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.parcours = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'parcoursListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ParcoursMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.parcours = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'parcoursListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
