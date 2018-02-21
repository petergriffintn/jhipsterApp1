import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UniversiteMySuffix } from './universite-my-suffix.model';
import { UniversiteMySuffixService } from './universite-my-suffix.service';

@Component({
    selector: 'jhi-universite-my-suffix-detail',
    templateUrl: './universite-my-suffix-detail.component.html'
})
export class UniversiteMySuffixDetailComponent implements OnInit, OnDestroy {

    universite: UniversiteMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private universiteService: UniversiteMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUniversites();
    }

    load(id) {
        this.universiteService.find(id)
            .subscribe((universiteResponse: HttpResponse<UniversiteMySuffix>) => {
                this.universite = universiteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUniversites() {
        this.eventSubscriber = this.eventManager.subscribe(
            'universiteListModification',
            (response) => this.load(this.universite.id)
        );
    }
}
