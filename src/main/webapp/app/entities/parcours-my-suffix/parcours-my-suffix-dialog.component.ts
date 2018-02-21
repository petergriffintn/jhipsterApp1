import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ParcoursMySuffix } from './parcours-my-suffix.model';
import { ParcoursMySuffixPopupService } from './parcours-my-suffix-popup.service';
import { ParcoursMySuffixService } from './parcours-my-suffix.service';
import { DiplomeMySuffix, DiplomeMySuffixService } from '../diplome-my-suffix';
import { MentionMySuffix, MentionMySuffixService } from '../mention-my-suffix';

@Component({
    selector: 'jhi-parcours-my-suffix-dialog',
    templateUrl: './parcours-my-suffix-dialog.component.html'
})
export class ParcoursMySuffixDialogComponent implements OnInit {

    parcours: ParcoursMySuffix;
    isSaving: boolean;

    diplomes: DiplomeMySuffix[];

    mentions: MentionMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private parcoursService: ParcoursMySuffixService,
        private diplomeService: DiplomeMySuffixService,
        private mentionService: MentionMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.diplomeService.query()
            .subscribe((res: HttpResponse<DiplomeMySuffix[]>) => { this.diplomes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.mentionService.query()
            .subscribe((res: HttpResponse<MentionMySuffix[]>) => { this.mentions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.parcours.id !== undefined) {
            this.subscribeToSaveResponse(
                this.parcoursService.update(this.parcours));
        } else {
            this.subscribeToSaveResponse(
                this.parcoursService.create(this.parcours));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ParcoursMySuffix>>) {
        result.subscribe((res: HttpResponse<ParcoursMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ParcoursMySuffix) {
        this.eventManager.broadcast({ name: 'parcoursListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDiplomeById(index: number, item: DiplomeMySuffix) {
        return item.id;
    }

    trackMentionById(index: number, item: MentionMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-parcours-my-suffix-popup',
    template: ''
})
export class ParcoursMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parcoursPopupService: ParcoursMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.parcoursPopupService
                    .open(ParcoursMySuffixDialogComponent as Component, params['id']);
            } else {
                this.parcoursPopupService
                    .open(ParcoursMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
