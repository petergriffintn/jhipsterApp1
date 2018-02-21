import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SpecialiteMySuffix } from './specialite-my-suffix.model';
import { SpecialiteMySuffixPopupService } from './specialite-my-suffix-popup.service';
import { SpecialiteMySuffixService } from './specialite-my-suffix.service';

@Component({
    selector: 'jhi-specialite-my-suffix-delete-dialog',
    templateUrl: './specialite-my-suffix-delete-dialog.component.html'
})
export class SpecialiteMySuffixDeleteDialogComponent {

    specialite: SpecialiteMySuffix;

    constructor(
        private specialiteService: SpecialiteMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.specialiteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'specialiteListModification',
                content: 'Deleted an specialite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-specialite-my-suffix-delete-popup',
    template: ''
})
export class SpecialiteMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private specialitePopupService: SpecialiteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.specialitePopupService
                .open(SpecialiteMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
