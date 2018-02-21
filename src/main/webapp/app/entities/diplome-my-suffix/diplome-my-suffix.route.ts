import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DiplomeMySuffixComponent } from './diplome-my-suffix.component';
import { DiplomeMySuffixDetailComponent } from './diplome-my-suffix-detail.component';
import { DiplomeMySuffixPopupComponent } from './diplome-my-suffix-dialog.component';
import { DiplomeMySuffixDeletePopupComponent } from './diplome-my-suffix-delete-dialog.component';

export const diplomeRoute: Routes = [
    {
        path: 'diplome-my-suffix',
        component: DiplomeMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.diplome.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'diplome-my-suffix/:id',
        component: DiplomeMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.diplome.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diplomePopupRoute: Routes = [
    {
        path: 'diplome-my-suffix-new',
        component: DiplomeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.diplome.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'diplome-my-suffix/:id/edit',
        component: DiplomeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.diplome.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'diplome-my-suffix/:id/delete',
        component: DiplomeMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.diplome.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
