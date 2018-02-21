import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EtablissementMySuffix } from './etablissement-my-suffix.model';
import { EtablissementMySuffixPopupService } from './etablissement-my-suffix-popup.service';
import { EtablissementMySuffixService } from './etablissement-my-suffix.service';

@Component({
    selector: 'jhi-etablissement-my-suffix-delete-dialog',
    templateUrl: './etablissement-my-suffix-delete-dialog.component.html'
})
export class EtablissementMySuffixDeleteDialogComponent {

    etablissement: EtablissementMySuffix;

    constructor(
        private etablissementService: EtablissementMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.etablissementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'etablissementListModification',
                content: 'Deleted an etablissement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-etablissement-my-suffix-delete-popup',
    template: ''
})
export class EtablissementMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etablissementPopupService: EtablissementMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.etablissementPopupService
                .open(EtablissementMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
