import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProgrammeMySuffixComponent } from './programme-my-suffix.component';
import { ProgrammeMySuffixDetailComponent } from './programme-my-suffix-detail.component';
import { ProgrammeMySuffixPopupComponent } from './programme-my-suffix-dialog.component';
import { ProgrammeMySuffixDeletePopupComponent } from './programme-my-suffix-delete-dialog.component';

export const programmeRoute: Routes = [
    {
        path: 'programme-my-suffix',
        component: ProgrammeMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.programme.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'programme-my-suffix/:id',
        component: ProgrammeMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.programme.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const programmePopupRoute: Routes = [
    {
        path: 'programme-my-suffix-new',
        component: ProgrammeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.programme.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'programme-my-suffix/:id/edit',
        component: ProgrammeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.programme.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'programme-my-suffix/:id/delete',
        component: ProgrammeMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp1App.programme.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
