import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DomaineMySuffix } from './domaine-my-suffix.model';
import { DomaineMySuffixPopupService } from './domaine-my-suffix-popup.service';
import { DomaineMySuffixService } from './domaine-my-suffix.service';

@Component({
    selector: 'jhi-domaine-my-suffix-dialog',
    templateUrl: './domaine-my-suffix-dialog.component.html'
})
export class DomaineMySuffixDialogComponent implements OnInit {

    domaine: DomaineMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private domaineService: DomaineMySuffixService,
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
        if (this.domaine.id !== undefined) {
            this.subscribeToSaveResponse(
                this.domaineService.update(this.domaine));
        } else {
            this.subscribeToSaveResponse(
                this.domaineService.create(this.domaine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DomaineMySuffix>>) {
        result.subscribe((res: HttpResponse<DomaineMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DomaineMySuffix) {
        this.eventManager.broadcast({ name: 'domaineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-domaine-my-suffix-popup',
    template: ''
})
export class DomaineMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private domainePopupService: DomaineMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.domainePopupService
                    .open(DomaineMySuffixDialogComponent as Component, params['id']);
            } else {
                this.domainePopupService
                    .open(DomaineMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
