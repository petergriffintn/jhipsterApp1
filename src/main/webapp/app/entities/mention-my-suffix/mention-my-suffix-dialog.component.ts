import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MentionMySuffix } from './mention-my-suffix.model';
import { MentionMySuffixPopupService } from './mention-my-suffix-popup.service';
import { MentionMySuffixService } from './mention-my-suffix.service';
import { DomaineMySuffix, DomaineMySuffixService } from '../domaine-my-suffix';

@Component({
    selector: 'jhi-mention-my-suffix-dialog',
    templateUrl: './mention-my-suffix-dialog.component.html'
})
export class MentionMySuffixDialogComponent implements OnInit {

    mention: MentionMySuffix;
    isSaving: boolean;

    domaines: DomaineMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mentionService: MentionMySuffixService,
        private domaineService: DomaineMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.domaineService.query()
            .subscribe((res: HttpResponse<DomaineMySuffix[]>) => { this.domaines = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mention.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mentionService.update(this.mention));
        } else {
            this.subscribeToSaveResponse(
                this.mentionService.create(this.mention));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MentionMySuffix>>) {
        result.subscribe((res: HttpResponse<MentionMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MentionMySuffix) {
        this.eventManager.broadcast({ name: 'mentionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDomaineById(index: number, item: DomaineMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-mention-my-suffix-popup',
    template: ''
})
export class MentionMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mentionPopupService: MentionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mentionPopupService
                    .open(MentionMySuffixDialogComponent as Component, params['id']);
            } else {
                this.mentionPopupService
                    .open(MentionMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
