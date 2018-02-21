import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ParcoursMySuffix } from './parcours-my-suffix.model';
import { ParcoursMySuffixPopupService } from './parcours-my-suffix-popup.service';
import { ParcoursMySuffixService } from './parcours-my-suffix.service';

@Component({
    selector: 'jhi-parcours-my-suffix-delete-dialog',
    templateUrl: './parcours-my-suffix-delete-dialog.component.html'
})
export class ParcoursMySuffixDeleteDialogComponent {

    parcours: ParcoursMySuffix;

    constructor(
        private parcoursService: ParcoursMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parcoursService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'parcoursListModification',
                content: 'Deleted an parcours'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parcours-my-suffix-delete-popup',
    template: ''
})
export class ParcoursMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parcoursPopupService: ParcoursMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.parcoursPopupService
                .open(ParcoursMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
