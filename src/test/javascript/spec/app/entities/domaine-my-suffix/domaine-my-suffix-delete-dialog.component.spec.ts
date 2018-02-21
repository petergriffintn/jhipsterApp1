/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp1TestModule } from '../../../test.module';
import { DomaineMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/domaine-my-suffix/domaine-my-suffix-delete-dialog.component';
import { DomaineMySuffixService } from '../../../../../../main/webapp/app/entities/domaine-my-suffix/domaine-my-suffix.service';

describe('Component Tests', () => {

    describe('DomaineMySuffix Management Delete Component', () => {
        let comp: DomaineMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DomaineMySuffixDeleteDialogComponent>;
        let service: DomaineMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterApp1TestModule],
                declarations: [DomaineMySuffixDeleteDialogComponent],
                providers: [
                    DomaineMySuffixService
                ]
            })
            .overrideTemplate(DomaineMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DomaineMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DomaineMySuffixService);
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
