import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EeMySuffix } from './ee-my-suffix.model';
import { EeMySuffixService } from './ee-my-suffix.service';

@Component({
    selector: 'jhi-ee-my-suffix-detail',
    templateUrl: './ee-my-suffix-detail.component.html'
})
export class EeMySuffixDetailComponent implements OnInit, OnDestroy {

    ee: EeMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eeService: EeMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEes();
    }

    load(id) {
        this.eeService.find(id)
            .subscribe((eeResponse: HttpResponse<EeMySuffix>) => {
                this.ee = eeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eeListModification',
            (response) => this.load(this.ee.id)
        );
    }
}
