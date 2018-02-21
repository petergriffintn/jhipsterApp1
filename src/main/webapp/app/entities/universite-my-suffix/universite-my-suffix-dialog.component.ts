import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UniversiteMySuffix } from './universite-my-suffix.model';
import { UniversiteMySuffixPopupService } from './universite-my-suffix-popup.service';
import { UniversiteMySuffixService } from './universite-my-suffix.service';

@Component({
    selector: 'jhi-universite-my-suffix-dialog',
    templateUrl: './universite-my-suffix-dialog.component.html'
})
export class UniversiteMySuffixDialogComponent implements OnInit {

    universite: UniversiteMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private universiteService: UniversiteMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.universite.id !== undefined) {
            this.subscribeToSaveResponse(
                this.universiteService.update(this.universite));
        } else {
            this.subscribeToSaveResponse(
                this.universiteService.create(this.universite));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UniversiteMySuffix>>) {
        result.subscribe((res: HttpResponse<UniversiteMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UniversiteMySuffix) {
        this.eventManager.broadcast({ name: 'universiteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-universite-my-suffix-popup',
    template: ''
})
export class UniversiteMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private universitePopupService: UniversiteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.universitePopupService
                    .open(UniversiteMySuffixDialogComponent as Component, params['id']);
            } else {
                this.universitePopupService
                    .open(UniversiteMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
