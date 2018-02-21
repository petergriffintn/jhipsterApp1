import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp1SharedModule } from '../../shared';
import {
    DiplomeMySuffixService,
    DiplomeMySuffixPopupService,
    DiplomeMySuffixComponent,
    DiplomeMySuffixDetailComponent,
    DiplomeMySuffixDialogComponent,
    DiplomeMySuffixPopupComponent,
    DiplomeMySuffixDeletePopupComponent,
    DiplomeMySuffixDeleteDialogComponent,
    diplomeRoute,
    diplomePopupRoute,
} from './';

const ENTITY_STATES = [
    ...diplomeRoute,
    ...diplomePopupRoute,
];

@NgModule({
    imports: [
        JhipsterApp1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiplomeMySuffixComponent,
        DiplomeMySuffixDetailComponent,
        DiplomeMySuffixDialogComponent,
        DiplomeMySuffixDeleteDialogComponent,
        DiplomeMySuffixPopupComponent,
        DiplomeMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DiplomeMySuffixComponent,
        DiplomeMySuffixDialogComponent,
        DiplomeMySuffixPopupComponent,
        DiplomeMySuffixDeleteDialogComponent,
        DiplomeMySuffixDeletePopupComponent,
    ],
    providers: [
        DiplomeMySuffixService,
        DiplomeMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1DiplomeMySuffixModule {}
