import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProgrammeMySuffix } from './programme-my-suffix.model';
import { ProgrammeMySuffixPopupService } from './programme-my-suffix-popup.service';
import { ProgrammeMySuffixService } from './programme-my-suffix.service';

@Component({
    selector: 'jhi-programme-my-suffix-delete-dialog',
    templateUrl: './programme-my-suffix-delete-dialog.component.html'
})
export class ProgrammeMySuffixDeleteDialogComponent {

    programme: ProgrammeMySuffix;

    constructor(
        private programmeService: ProgrammeMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.programmeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'programmeListModification',
                content: 'Deleted an programme'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-programme-my-suffix-delete-popup',
    template: ''
})
export class ProgrammeMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private programmePopupService: ProgrammeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.programmePopupService
                .open(ProgrammeMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
