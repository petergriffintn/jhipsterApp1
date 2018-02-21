import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MentionMySuffix } from './mention-my-suffix.model';
import { MentionMySuffixService } from './mention-my-suffix.service';

@Component({
    selector: 'jhi-mention-my-suffix-detail',
    templateUrl: './mention-my-suffix-detail.component.html'
})
export class MentionMySuffixDetailComponent implements OnInit, OnDestroy {

    mention: MentionMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mentionService: MentionMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMentions();
    }

    load(id) {
        this.mentionService.find(id)
            .subscribe((mentionResponse: HttpResponse<MentionMySuffix>) => {
                this.mention = mentionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMentions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mentionListModification',
            (response) => this.load(this.mention.id)
        );
    }
}
