import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EeMySuffix } from './ee-my-suffix.model';
import { EeMySuffixPopupService } from './ee-my-suffix-popup.service';
import { EeMySuffixService } from './ee-my-suffix.service';

@Component({
    selector: 'jhi-ee-my-suffix-delete-dialog',
    templateUrl: './ee-my-suffix-delete-dialog.component.html'
})
export class EeMySuffixDeleteDialogComponent {

    ee: EeMySuffix;

    constructor(
        private eeService: EeMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eeListModification',
                content: 'Deleted an ee'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ee-my-suffix-delete-popup',
    template: ''
})
export class EeMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eePopupService: EeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eePopupService
                .open(EeMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
