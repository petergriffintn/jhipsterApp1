import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EeMySuffixComponent } from './ee-my-suffix.component';
import { EeMySuffixDetailComponent } from './ee-my-suffix-detail.component';
import { EeMySuffixPopupComponent } from './ee-my-suffix-dialog.component';
import { EeMySuffixDeletePopupComponent } from './ee-my-suffix-delete-dialog.component';

export const eeRoute: Routes = [
    {
        path: 'ee-my-suffix',
        component: EeMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.ee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ee-my-suffix/:id',
        component: EeMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.ee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eePopupRoute: Routes = [
    {
        path: 'ee-my-suffix-new',
        component: EeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.ee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ee-my-suffix/:id/edit',
        component: EeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.ee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ee-my-suffix/:id/delete',
        component: EeMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.ee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
