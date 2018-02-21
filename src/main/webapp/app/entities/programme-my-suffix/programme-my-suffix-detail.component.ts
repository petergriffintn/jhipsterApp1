import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProgrammeMySuffix } from './programme-my-suffix.model';
import { ProgrammeMySuffixService } from './programme-my-suffix.service';

@Component({
    selector: 'jhi-programme-my-suffix-detail',
    templateUrl: './programme-my-suffix-detail.component.html'
})
export class ProgrammeMySuffixDetailComponent implements OnInit, OnDestroy {

    programme: ProgrammeMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private programmeService: ProgrammeMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProgrammes();
    }

    load(id) {
        this.programmeService.find(id)
            .subscribe((programmeResponse: HttpResponse<ProgrammeMySuffix>) => {
                this.programme = programmeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProgrammes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'programmeListModification',
            (response) => this.load(this.programme.id)
        );
    }
}
