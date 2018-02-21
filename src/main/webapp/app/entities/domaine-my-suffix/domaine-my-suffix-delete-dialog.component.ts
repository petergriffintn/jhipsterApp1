import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DomaineMySuffix } from './domaine-my-suffix.model';
import { DomaineMySuffixPopupService } from './domaine-my-suffix-popup.service';
import { DomaineMySuffixService } from './domaine-my-suffix.service';

@Component({
    selector: 'jhi-domaine-my-suffix-delete-dialog',
    templateUrl: './domaine-my-suffix-delete-dialog.component.html'
})
export class DomaineMySuffixDeleteDialogComponent {

    domaine: DomaineMySuffix;

    constructor(
        private domaineService: DomaineMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.domaineService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'domaineListModification',
                content: 'Deleted an domaine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-domaine-my-suffix-delete-popup',
    template: ''
})
export class DomaineMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private domainePopupService: DomaineMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.domainePopupService
                .open(DomaineMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
