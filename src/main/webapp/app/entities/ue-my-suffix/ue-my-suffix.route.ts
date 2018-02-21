import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UeMySuffixComponent } from './ue-my-suffix.component';
import { UeMySuffixDetailComponent } from './ue-my-suffix-detail.component';
import { UeMySuffixPopupComponent } from './ue-my-suffix-dialog.component';
import { UeMySuffixDeletePopupComponent } from './ue-my-suffix-delete-dialog.component';

export const ueRoute: Routes = [
    {
        path: 'ue-my-suffix',
        component: UeMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.ue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ue-my-suffix/:id',
        component: UeMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.ue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const uePopupRoute: Routes = [
    {
        path: 'ue-my-suffix-new',
        component: UeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.ue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ue-my-suffix/:id/edit',
        component: UeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.ue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ue-my-suffix/:id/delete',
        component: UeMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.ue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
