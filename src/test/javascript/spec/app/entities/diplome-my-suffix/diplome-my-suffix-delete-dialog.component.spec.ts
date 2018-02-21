/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp1TestModule } from '../../../test.module';
import { DiplomeMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/diplome-my-suffix/diplome-my-suffix-delete-dialog.component';
import { DiplomeMySuffixService } from '../../../../../../main/webapp/app/entities/diplome-my-suffix/diplome-my-suffix.service';

describe('Component Tests', () => {

    describe('DiplomeMySuffix Management Delete Component', () => {
        let comp: DiplomeMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DiplomeMySuffixDeleteDialogComponent>;
        let service: DiplomeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [DiplomeMySuffixDeleteDialogComponent],
                providers: [
                    DiplomeMySuffixService
                ]
            })
            .overrideTemplate(DiplomeMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiplomeMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiplomeMySuffixService);
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
