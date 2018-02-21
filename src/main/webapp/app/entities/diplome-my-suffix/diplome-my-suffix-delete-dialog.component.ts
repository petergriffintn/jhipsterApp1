import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DiplomeMySuffix } from './diplome-my-suffix.model';
import { DiplomeMySuffixPopupService } from './diplome-my-suffix-popup.service';
import { DiplomeMySuffixService } from './diplome-my-suffix.service';

@Component({
    selector: 'jhi-diplome-my-suffix-delete-dialog',
    templateUrl: './diplome-my-suffix-delete-dialog.component.html'
})
export class DiplomeMySuffixDeleteDialogComponent {

    diplome: DiplomeMySuffix;

    constructor(
        private diplomeService: DiplomeMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diplomeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'diplomeListModification',
                content: 'Deleted an diplome'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-diplome-my-suffix-delete-popup',
    template: ''
})
export class DiplomeMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diplomePopupService: DiplomeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.diplomePopupService
                .open(DiplomeMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
