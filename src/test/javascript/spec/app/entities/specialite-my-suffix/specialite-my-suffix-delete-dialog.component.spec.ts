/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp1TestModule } from '../../../test.module';
import { SpecialiteMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix-delete-dialog.component';
import { SpecialiteMySuffixService } from '../../../../../../main/webapp/app/entities/specialite-my-suffix/specialite-my-suffix.service';

describe('Component Tests', () => {

    describe('SpecialiteMySuffix Management Delete Component', () => {
        let comp: SpecialiteMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SpecialiteMySuffixDeleteDialogComponent>;
        let service: SpecialiteMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [SpecialiteMySuffixDeleteDialogComponent],
                providers: [
                    SpecialiteMySuffixService
                ]
            })
            .overrideTemplate(SpecialiteMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpecialiteMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpecialiteMySuffixService);
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
