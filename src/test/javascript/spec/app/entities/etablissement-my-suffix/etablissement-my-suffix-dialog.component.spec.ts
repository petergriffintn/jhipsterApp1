/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp1TestModule } from '../../../test.module';
import { EtablissementMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix-dialog.component';
import { EtablissementMySuffixService } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix.service';
import { EtablissementMySuffix } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix.model';
import { UniversiteMySuffixService } from '../../../../../../main/webapp/app/entities/universite-my-suffix';

describe('Component Tests', () => {

    describe('EtablissementMySuffix Management Dialog Component', () => {
        let comp: EtablissementMySuffixDialogComponent;
        let fixture: ComponentFixture<EtablissementMySuffixDialogComponent>;
        let service: EtablissementMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [EtablissementMySuffixDialogComponent],
                providers: [
                    UniversiteMySuffixService,
                    EtablissementMySuffixService
                ]
            })
            .overrideTemplate(EtablissementMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtablissementMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtablissementMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EtablissementMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.etablissement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'etablissementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EtablissementMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.etablissement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'etablissementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
