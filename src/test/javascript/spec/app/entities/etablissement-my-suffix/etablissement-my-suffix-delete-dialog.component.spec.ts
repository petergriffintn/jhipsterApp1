/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp1TestModule } from '../../../test.module';
import { EtablissementMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix-delete-dialog.component';
import { EtablissementMySuffixService } from '../../../../../../main/webapp/app/entities/etablissement-my-suffix/etablissement-my-suffix.service';

describe('Component Tests', () => {

    describe('EtablissementMySuffix Management Delete Component', () => {
        let comp: EtablissementMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EtablissementMySuffixDeleteDialogComponent>;
        let service: EtablissementMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [EtablissementMySuffixDeleteDialogComponent],
                providers: [
                    EtablissementMySuffixService
                ]
            })
            .overrideTemplate(EtablissementMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtablissementMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtablissementMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
