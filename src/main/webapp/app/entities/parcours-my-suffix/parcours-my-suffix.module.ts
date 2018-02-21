import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp1SharedModule } from '../../shared';
import {
    ParcoursMySuffixService,
    ParcoursMySuffixPopupService,
    ParcoursMySuffixComponent,
    ParcoursMySuffixDetailComponent,
    ParcoursMySuffixDialogComponent,
    ParcoursMySuffixPopupComponent,
    ParcoursMySuffixDeletePopupComponent,
    ParcoursMySuffixDeleteDialogComponent,
    parcoursRoute,
    parcoursPopupRoute,
} from './';

const ENTITY_STATES = [
    ...parcoursRoute,
    ...parcoursPopupRoute,
];

@NgModule({
    imports: [
        JhipsterApp1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ParcoursMySuffixComponent,
        ParcoursMySuffixDetailComponent,
        ParcoursMySuffixDialogComponent,
        ParcoursMySuffixDeleteDialogComponent,
        ParcoursMySuffixPopupComponent,
        ParcoursMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ParcoursMySuffixComponent,
        ParcoursMySuffixDialogComponent,
        ParcoursMySuffixPopupComponent,
        ParcoursMySuffixDeleteDialogComponent,
        ParcoursMySuffixDeletePopupComponent,
    ],
    providers: [
        ParcoursMySuffixService,
        ParcoursMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1ParcoursMySuffixModule {}
