import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DomaineMySuffixComponent } from './domaine-my-suffix.component';
import { DomaineMySuffixDetailComponent } from './domaine-my-suffix-detail.component';
import { DomaineMySuffixPopupComponent } from './domaine-my-suffix-dialog.component';
import { DomaineMySuffixDeletePopupComponent } from './domaine-my-suffix-delete-dialog.component';

export const domaineRoute: Routes = [
    {
        path: 'domaine-my-suffix',
        component: DomaineMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.domaine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'domaine-my-suffix/:id',
        component: DomaineMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.domaine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const domainePopupRoute: Routes = [
    {
        path: 'domaine-my-suffix-new',
        component: DomaineMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.domaine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'domaine-my-suffix/:id/edit',
        component: DomaineMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.domaine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'domaine-my-suffix/:id/delete',
        component: DomaineMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.domaine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
