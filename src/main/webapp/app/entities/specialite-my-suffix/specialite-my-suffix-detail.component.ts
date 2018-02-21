import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SpecialiteMySuffix } from './specialite-my-suffix.model';
import { SpecialiteMySuffixService } from './specialite-my-suffix.service';

@Component({
    selector: 'jhi-specialite-my-suffix-detail',
    templateUrl: './specialite-my-suffix-detail.component.html'
})
export class SpecialiteMySuffixDetailComponent implements OnInit, OnDestroy {

    specialite: SpecialiteMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private specialiteService: SpecialiteMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSpecialites();
    }

    load(id) {
        this.specialiteService.find(id)
            .subscribe((specialiteResponse: HttpResponse<SpecialiteMySuffix>) => {
                this.specialite = specialiteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSpecialites() {
        this.eventSubscriber = this.eventManager.subscribe(
            'specialiteListModification',
            (response) => this.load(this.specialite.id)
        );
    }
}
