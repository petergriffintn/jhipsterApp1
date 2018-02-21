import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EtablissementMySuffix } from './etablissement-my-suffix.model';
import { EtablissementMySuffixService } from './etablissement-my-suffix.service';

@Component({
    selector: 'jhi-etablissement-my-suffix-detail',
    templateUrl: './etablissement-my-suffix-detail.component.html'
})
export class EtablissementMySuffixDetailComponent implements OnInit, OnDestroy {

    etablissement: EtablissementMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private etablissementService: EtablissementMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEtablissements();
    }

    load(id) {
        this.etablissementService.find(id)
            .subscribe((etablissementResponse: HttpResponse<EtablissementMySuffix>) => {
                this.etablissement = etablissementResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEtablissements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'etablissementListModification',
            (response) => this.load(this.etablissement.id)
        );
    }
}
