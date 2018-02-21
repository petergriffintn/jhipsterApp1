import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UeMySuffix } from './ue-my-suffix.model';
import { UeMySuffixPopupService } from './ue-my-suffix-popup.service';
import { UeMySuffixService } from './ue-my-suffix.service';
import { ProgrammeMySuffix, ProgrammeMySuffixService } from '../programme-my-suffix';

@Component({
    selector: 'jhi-ue-my-suffix-dialog',
    templateUrl: './ue-my-suffix-dialog.component.html'
})
export class UeMySuffixDialogComponent implements OnInit {

    ue: UeMySuffix;
    isSaving: boolean;

    programmes: ProgrammeMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ueService: UeMySuffixService,
        private programmeService: ProgrammeMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.programmeService.query()
            .subscribe((res: HttpResponse<ProgrammeMySuffix[]>) => { this.programmes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ue.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ueService.update(this.ue));
        } else {
            this.subscribeToSaveResponse(
                this.ueService.create(this.ue));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UeMySuffix>>) {
        result.subscribe((res: HttpResponse<UeMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UeMySuffix) {
        this.eventManager.broadcast({ name: 'ueListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProgrammeById(index: number, item: ProgrammeMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ue-my-suffix-popup',
    template: ''
})
export class UeMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private uePopupService: UeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.uePopupService
                    .open(UeMySuffixDialogComponent as Component, params['id']);
            } else {
                this.uePopupService
                    .open(UeMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
