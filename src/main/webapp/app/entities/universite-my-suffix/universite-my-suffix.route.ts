import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UniversiteMySuffixComponent } from './universite-my-suffix.component';
import { UniversiteMySuffixDetailComponent } from './universite-my-suffix-detail.component';
import { UniversiteMySuffixPopupComponent } from './universite-my-suffix-dialog.component';
import { UniversiteMySuffixDeletePopupComponent } from './universite-my-suffix-delete-dialog.component';

export const universiteRoute: Routes = [
    {
        path: 'universite-my-suffix',
        component: UniversiteMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.universite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'universite-my-suffix/:id',
        component: UniversiteMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.universite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const universitePopupRoute: Routes = [
    {
        path: 'universite-my-suffix-new',
        component: UniversiteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.universite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'universite-my-suffix/:id/edit',
        component: UniversiteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.universite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'universite-my-suffix/:id/delete',
        component: UniversiteMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.universite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
