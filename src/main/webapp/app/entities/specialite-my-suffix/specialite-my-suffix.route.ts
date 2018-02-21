import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SpecialiteMySuffixComponent } from './specialite-my-suffix.component';
import { SpecialiteMySuffixDetailComponent } from './specialite-my-suffix-detail.component';
import { SpecialiteMySuffixPopupComponent } from './specialite-my-suffix-dialog.component';
import { SpecialiteMySuffixDeletePopupComponent } from './specialite-my-suffix-delete-dialog.component';

export const specialiteRoute: Routes = [
    {
        path: 'specialite-my-suffix',
        component: SpecialiteMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.specialite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'specialite-my-suffix/:id',
        component: SpecialiteMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.specialite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const specialitePopupRoute: Routes = [
    {
        path: 'specialite-my-suffix-new',
        component: SpecialiteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.specialite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'specialite-my-suffix/:id/edit',
        component: SpecialiteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.specialite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'specialite-my-suffix/:id/delete',
        component: SpecialiteMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.specialite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
