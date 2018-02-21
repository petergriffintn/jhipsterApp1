import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EeMySuffix } from './ee-my-suffix.model';
import { EeMySuffixPopupService } from './ee-my-suffix-popup.service';
import { EeMySuffixService } from './ee-my-suffix.service';
import { UeMySuffix, UeMySuffixService } from '../ue-my-suffix';

@Component({
    selector: 'jhi-ee-my-suffix-dialog',
    templateUrl: './ee-my-suffix-dialog.component.html'
})
export class EeMySuffixDialogComponent implements OnInit {

    ee: EeMySuffix;
    isSaving: boolean;

    ues: UeMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eeService: EeMySuffixService,
        private ueService: UeMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ueService.query()
            .subscribe((res: HttpResponse<UeMySuffix[]>) => { this.ues = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ee.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eeService.update(this.ee));
        } else {
            this.subscribeToSaveResponse(
                this.eeService.create(this.ee));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EeMySuffix>>) {
        result.subscribe((res: HttpResponse<EeMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EeMySuffix) {
        this.eventManager.broadcast({ name: 'eeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUeById(index: number, item: UeMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ee-my-suffix-popup',
    template: ''
})
export class EeMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eePopupService: EeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eePopupService
                    .open(EeMySuffixDialogComponent as Component, params['id']);
            } else {
                this.eePopupService
                    .open(EeMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
