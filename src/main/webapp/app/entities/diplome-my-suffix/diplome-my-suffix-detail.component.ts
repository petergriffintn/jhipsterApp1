import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DiplomeMySuffix } from './diplome-my-suffix.model';
import { DiplomeMySuffixService } from './diplome-my-suffix.service';

@Component({
    selector: 'jhi-diplome-my-suffix-detail',
    templateUrl: './diplome-my-suffix-detail.component.html'
})
export class DiplomeMySuffixDetailComponent implements OnInit, OnDestroy {

    diplome: DiplomeMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private diplomeService: DiplomeMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiplomes();
    }

    load(id) {
        this.diplomeService.find(id)
            .subscribe((diplomeResponse: HttpResponse<DiplomeMySuffix>) => {
                this.diplome = diplomeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiplomes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'diplomeListModification',
            (response) => this.load(this.diplome.id)
        );
    }
}
