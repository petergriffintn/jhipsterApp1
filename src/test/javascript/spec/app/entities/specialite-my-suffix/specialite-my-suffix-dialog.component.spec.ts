/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp1TestModule } from '../../../test.module';
import { SpecialiteMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix-dialog.component';
import { SpecialiteMySuffixService } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix.service';
import { SpecialiteMySuffix } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix.model';
import { EtablissementMySuffixService } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix';
import { ParcoursMySuffixService } from '../../../../../../main/webapp/app/entities/parcours-my-suffix';

describe('Component Tests', () => {

    describe('SpecialiteMySuffix Management Dialog Component', () => {
        let comp: SpecialiteMySuffixDialogComponent;
        let fixture: ComponentFixture<SpecialiteMySuffixDialogComponent>;
        let service: SpecialiteMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [SpecialiteMySuffixDialogComponent],
                providers: [
                    EtablissementMySuffixService,
                    ParcoursMySuffixService,
                    SpecialiteMySuffixService
                ]
            })
            .overrideTemplate(SpecialiteMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpecialiteMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpecialiteMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SpecialiteMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.specialite = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'specialiteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SpecialiteMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.specialite = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'specialiteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
