import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SpecialiteMySuffix } from './specialite-my-suffix.model';
import { SpecialiteMySuffixPopupService } from './specialite-my-suffix-popup.service';
import { SpecialiteMySuffixService } from './specialite-my-suffix.service';
import { EtablissementMySuffix, EtablissementMySuffixService } from '../etablissement-my-suffix';
import { ParcoursMySuffix, ParcoursMySuffixService } from '../parcours-my-suffix';

@Component({
    selector: 'jhi-specialite-my-suffix-dialog',
    templateUrl: './specialite-my-suffix-dialog.component.html'
})
export class SpecialiteMySuffixDialogComponent implements OnInit {

    specialite: SpecialiteMySuffix;
    isSaving: boolean;

    etablissements: EtablissementMySuffix[];

    parcours: ParcoursMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private specialiteService: SpecialiteMySuffixService,
        private etablissementService: EtablissementMySuffixService,
        private parcoursService: ParcoursMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.etablissementService
            .query({filter: 'specialite-is-null'})
            .subscribe((res: HttpResponse<EtablissementMySuffix[]>) => {
                if (!this.specialite.etablissementId) {
                    this.etablissements = res.body;
                } else {
                    this.etablissementService
                        .find(this.specialite.etablissementId)
                        .subscribe((subRes: HttpResponse<EtablissementMySuffix>) => {
                            this.etablissements = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.parcoursService.query()
            .subscribe((res: HttpResponse<ParcoursMySuffix[]>) => { this.parcours = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.specialite.id !== undefined) {
            this.subscribeToSaveResponse(
                this.specialiteService.update(this.specialite));
        } else {
            this.subscribeToSaveResponse(
                this.specialiteService.create(this.specialite));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SpecialiteMySuffix>>) {
        result.subscribe((res: HttpResponse<SpecialiteMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SpecialiteMySuffix) {
        this.eventManager.broadcast({ name: 'specialiteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEtablissementById(index: number, item: EtablissementMySuffix) {
        return item.id;
    }

    trackParcoursById(index: number, item: ParcoursMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-specialite-my-suffix-popup',
    template: ''
})
export class SpecialiteMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private specialitePopupService: SpecialiteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.specialitePopupService
                    .open(SpecialiteMySuffixDialogComponent as Component, params['id']);
            } else {
                this.specialitePopupService
                    .open(SpecialiteMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
