import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DiplomeMySuffix } from './diplome-my-suffix.model';
import { DiplomeMySuffixPopupService } from './diplome-my-suffix-popup.service';
import { DiplomeMySuffixService } from './diplome-my-suffix.service';

@Component({
    selector: 'jhi-diplome-my-suffix-dialog',
    templateUrl: './diplome-my-suffix-dialog.component.html'
})
export class DiplomeMySuffixDialogComponent implements OnInit {

    diplome: DiplomeMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private diplomeService: DiplomeMySuffixService,
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
        if (this.diplome.id !== undefined) {
            this.subscribeToSaveResponse(
                this.diplomeService.update(this.diplome));
        } else {
            this.subscribeToSaveResponse(
                this.diplomeService.create(this.diplome));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DiplomeMySuffix>>) {
        result.subscribe((res: HttpResponse<DiplomeMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DiplomeMySuffix) {
        this.eventManager.broadcast({ name: 'diplomeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-diplome-my-suffix-popup',
    template: ''
})
export class DiplomeMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diplomePopupService: DiplomeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.diplomePopupService
                    .open(DiplomeMySuffixDialogComponent as Component, params['id']);
            } else {
                this.diplomePopupService
                    .open(DiplomeMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
