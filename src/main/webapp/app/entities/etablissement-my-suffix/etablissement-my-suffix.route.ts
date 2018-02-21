import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EtablissementMySuffixComponent } from './etablissement-my-suffix.component';
import { EtablissementMySuffixDetailComponent } from './etablissement-my-suffix-detail.component';
import { EtablissementMySuffixPopupComponent } from './etablissement-my-suffix-dialog.component';
import { EtablissementMySuffixDeletePopupComponent } from './etablissement-my-suffix-delete-dialog.component';

export const etablissementRoute: Routes = [
    {
        path: 'etablissement-my-suffix',
        component: EtablissementMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.etablissement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'etablissement-my-suffix/:id',
        component: EtablissementMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.etablissement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const etablissementPopupRoute: Routes = [
    {
        path: 'etablissement-my-suffix-new',
        component: EtablissementMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.etablissement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etablissement-my-suffix/:id/edit',
        component: EtablissementMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.etablissement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etablissement-my-suffix/:id/delete',
        component: EtablissementMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.etablissement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
