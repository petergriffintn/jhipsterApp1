import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EtablissementMySuffix } from './etablissement-my-suffix.model';
import { EtablissementMySuffixPopupService } from './etablissement-my-suffix-popup.service';
import { EtablissementMySuffixService } from './etablissement-my-suffix.service';
import { UniversiteMySuffix, UniversiteMySuffixService } from '../universite-my-suffix';

@Component({
    selector: 'jhi-etablissement-my-suffix-dialog',
    templateUrl: './etablissement-my-suffix-dialog.component.html'
})
export class EtablissementMySuffixDialogComponent implements OnInit {

    etablissement: EtablissementMySuffix;
    isSaving: boolean;

    universites: UniversiteMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private etablissementService: EtablissementMySuffixService,
        private universiteService: UniversiteMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.universiteService.query()
            .subscribe((res: HttpResponse<UniversiteMySuffix[]>) => { this.universites = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.etablissement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.etablissementService.update(this.etablissement));
        } else {
            this.subscribeToSaveResponse(
                this.etablissementService.create(this.etablissement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EtablissementMySuffix>>) {
        result.subscribe((res: HttpResponse<EtablissementMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EtablissementMySuffix) {
        this.eventManager.broadcast({ name: 'etablissementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUniversiteById(index: number, item: UniversiteMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-etablissement-my-suffix-popup',
    template: ''
})
export class EtablissementMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etablissementPopupService: EtablissementMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.etablissementPopupService
                    .open(EtablissementMySuffixDialogComponent as Component, params['id']);
            } else {
                this.etablissementPopupService
                    .open(EtablissementMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
