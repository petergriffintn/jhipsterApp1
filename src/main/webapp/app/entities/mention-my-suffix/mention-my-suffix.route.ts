import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MentionMySuffixComponent } from './mention-my-suffix.component';
import { MentionMySuffixDetailComponent } from './mention-my-suffix-detail.component';
import { MentionMySuffixPopupComponent } from './mention-my-suffix-dialog.component';
import { MentionMySuffixDeletePopupComponent } from './mention-my-suffix-delete-dialog.component';

export const mentionRoute: Routes = [
    {
        path: 'mention-my-suffix',
        component: MentionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.mention.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mention-my-suffix/:id',
        component: MentionMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.mention.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mentionPopupRoute: Routes = [
    {
        path: 'mention-my-suffix-new',
        component: MentionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.mention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mention-my-suffix/:id/edit',
        component: MentionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.mention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mention-my-suffix/:id/delete',
        component: MentionMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.mention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
