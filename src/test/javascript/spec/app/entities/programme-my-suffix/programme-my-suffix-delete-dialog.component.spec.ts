/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp1TestModule } from '../../../test.module';
import { ProgrammeMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix-delete-dialog.component';
import { ProgrammeMySuffixService } from '../../../../../../main/webapp/app/entities/programme-my-suffix/programme-my-suffix.service';

describe('Component Tests', () => {

    describe('ProgrammeMySuffix Management Delete Component', () => {
        let comp: ProgrammeMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ProgrammeMySuffixDeleteDialogComponent>;
        let service: ProgrammeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [ProgrammeMySuffixDeleteDialogComponent],
                providers: [
                    ProgrammeMySuffixService
                ]
            })
            .overrideTemplate(ProgrammeMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProgrammeMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProgrammeMySuffixService);
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
