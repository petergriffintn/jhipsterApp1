import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UeMySuffix } from './ue-my-suffix.model';
import { UeMySuffixService } from './ue-my-suffix.service';

@Component({
    selector: 'jhi-ue-my-suffix-detail',
    templateUrl: './ue-my-suffix-detail.component.html'
})
export class UeMySuffixDetailComponent implements OnInit, OnDestroy {

    ue: UeMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ueService: UeMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUes();
    }

    load(id) {
        this.ueService.find(id)
            .subscribe((ueResponse: HttpResponse<UeMySuffix>) => {
                this.ue = ueResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ueListModification',
            (response) => this.load(this.ue.id)
        );
    }
}
