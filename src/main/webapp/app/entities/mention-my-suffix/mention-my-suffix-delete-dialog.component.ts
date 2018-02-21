import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MentionMySuffix } from './mention-my-suffix.model';
import { MentionMySuffixPopupService } from './mention-my-suffix-popup.service';
import { MentionMySuffixService } from './mention-my-suffix.service';

@Component({
    selector: 'jhi-mention-my-suffix-delete-dialog',
    templateUrl: './mention-my-suffix-delete-dialog.component.html'
})
export class MentionMySuffixDeleteDialogComponent {

    mention: MentionMySuffix;

    constructor(
        private mentionService: MentionMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mentionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mentionListModification',
                content: 'Deleted an mention'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mention-my-suffix-delete-popup',
    template: ''
})
export class MentionMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mentionPopupService: MentionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mentionPopupService
                .open(MentionMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
