/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp1TestModule } from '../../../test.module';
import { UniversiteMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/universite-my-suffix/universite-my-suffix-delete-dialog.component';
import { UniversiteMySuffixService } from '../../../../../../main/webapp/app/entities/universite-my-suffix/universite-my-suffix.service';

describe('Component Tests', () => {

    describe('UniversiteMySuffix Management Delete Component', () => {
        let comp: UniversiteMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<UniversiteMySuffixDeleteDialogComponent>;
        let service: UniversiteMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [UniversiteMySuffixDeleteDialogComponent],
                providers: [
                    UniversiteMySuffixService
                ]
            })
            .overrideTemplate(UniversiteMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UniversiteMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UniversiteMySuffixService);
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
