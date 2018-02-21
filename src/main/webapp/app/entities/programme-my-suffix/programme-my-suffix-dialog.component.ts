import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProgrammeMySuffix } from './programme-my-suffix.model';
import { ProgrammeMySuffixPopupService } from './programme-my-suffix-popup.service';
import { ProgrammeMySuffixService } from './programme-my-suffix.service';
import { SpecialiteMySuffix, SpecialiteMySuffixService } from '../specialite-my-suffix';

@Component({
    selector: 'jhi-programme-my-suffix-dialog',
    templateUrl: './programme-my-suffix-dialog.component.html'
})
export class ProgrammeMySuffixDialogComponent implements OnInit {

    programme: ProgrammeMySuffix;
    isSaving: boolean;

    specialites: SpecialiteMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private programmeService: ProgrammeMySuffixService,
        private specialiteService: SpecialiteMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.specialiteService.query()
            .subscribe((res: HttpResponse<SpecialiteMySuffix[]>) => { this.specialites = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.programme.id !== undefined) {
            this.subscribeToSaveResponse(
                this.programmeService.update(this.programme));
        } else {
            this.subscribeToSaveResponse(
                this.programmeService.create(this.programme));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProgrammeMySuffix>>) {
        result.subscribe((res: HttpResponse<ProgrammeMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProgrammeMySuffix) {
        this.eventManager.broadcast({ name: 'programmeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSpecialiteById(index: number, item: SpecialiteMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-programme-my-suffix-popup',
    template: ''
})
export class ProgrammeMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private programmePopupService: ProgrammeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.programmePopupService
                    .open(ProgrammeMySuffixDialogComponent as Component, params['id']);
            } else {
                this.programmePopupService
                    .open(ProgrammeMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
