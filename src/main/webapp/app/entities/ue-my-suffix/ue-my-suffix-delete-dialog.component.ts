import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UeMySuffix } from './ue-my-suffix.model';
import { UeMySuffixPopupService } from './ue-my-suffix-popup.service';
import { UeMySuffixService } from './ue-my-suffix.service';

@Component({
    selector: 'jhi-ue-my-suffix-delete-dialog',
    templateUrl: './ue-my-suffix-delete-dialog.component.html'
})
export class UeMySuffixDeleteDialogComponent {

    ue: UeMySuffix;

    constructor(
        private ueService: UeMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ueService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ueListModification',
                content: 'Deleted an ue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ue-my-suffix-delete-popup',
    template: ''
})
export class UeMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private uePopupService: UeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.uePopupService
                .open(UeMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
