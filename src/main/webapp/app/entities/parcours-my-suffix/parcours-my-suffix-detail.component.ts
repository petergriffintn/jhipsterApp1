import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ParcoursMySuffix } from './parcours-my-suffix.model';
import { ParcoursMySuffixService } from './parcours-my-suffix.service';

@Component({
    selector: 'jhi-parcours-my-suffix-detail',
    templateUrl: './parcours-my-suffix-detail.component.html'
})
export class ParcoursMySuffixDetailComponent implements OnInit, OnDestroy {

    parcours: ParcoursMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private parcoursService: ParcoursMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInParcours();
    }

    load(id) {
        this.parcoursService.find(id)
            .subscribe((parcoursResponse: HttpResponse<ParcoursMySuffix>) => {
                this.parcours = parcoursResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInParcours() {
        this.eventSubscriber = this.eventManager.subscribe(
            'parcoursListModification',
            (response) => this.load(this.parcours.id)
        );
    }
}
