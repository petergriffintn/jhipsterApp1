import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DomaineMySuffix } from './domaine-my-suffix.model';
import { DomaineMySuffixService } from './domaine-my-suffix.service';

@Component({
    selector: 'jhi-domaine-my-suffix-detail',
    templateUrl: './domaine-my-suffix-detail.component.html'
})
export class DomaineMySuffixDetailComponent implements OnInit, OnDestroy {

    domaine: DomaineMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private domaineService: DomaineMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDomaines();
    }

    load(id) {
        this.domaineService.find(id)
            .subscribe((domaineResponse: HttpResponse<DomaineMySuffix>) => {
                this.domaine = domaineResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDomaines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'domaineListModification',
            (response) => this.load(this.domaine.id)
        );
    }
}
