import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ParcoursMySuffixComponent } from './parcours-my-suffix.component';
import { ParcoursMySuffixDetailComponent } from './parcours-my-suffix-detail.component';
import { ParcoursMySuffixPopupComponent } from './parcours-my-suffix-dialog.component';
import { ParcoursMySuffixDeletePopupComponent } from './parcours-my-suffix-delete-dialog.component';

export const parcoursRoute: Routes = [
    {
        path: 'parcours-my-suffix',
        component: ParcoursMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.parcours.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'parcours-my-suffix/:id',
        component: ParcoursMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.parcours.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parcoursPopupRoute: Routes = [
    {
        path: 'parcours-my-suffix-new',
        component: ParcoursMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.parcours.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parcours-my-suffix/:id/edit',
        component: ParcoursMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.parcours.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parcours-my-suffix/:id/delete',
        component: ParcoursMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.parcours.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
