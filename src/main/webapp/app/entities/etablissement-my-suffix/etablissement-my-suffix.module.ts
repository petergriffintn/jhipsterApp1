import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp1SharedModule } from '../../shared';
import {
    EtablissementMySuffixService,
    EtablissementMySuffixPopupService,
    EtablissementMySuffixComponent,
    EtablissementMySuffixDetailComponent,
    EtablissementMySuffixDialogComponent,
    EtablissementMySuffixPopupComponent,
    EtablissementMySuffixDeletePopupComponent,
    EtablissementMySuffixDeleteDialogComponent,
    etablissementRoute,
    etablissementPopupRoute,
} from './';

const ENTITY_STATES = [
    ...etablissementRoute,
    ...etablissementPopupRoute,
];

@NgModule({
    imports: [
        JhipsterApp1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EtablissementMySuffixComponent,
        EtablissementMySuffixDetailComponent,
        EtablissementMySuffixDialogComponent,
        EtablissementMySuffixDeleteDialogComponent,
        EtablissementMySuffixPopupComponent,
        EtablissementMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EtablissementMySuffixComponent,
        EtablissementMySuffixDialogComponent,
        EtablissementMySuffixPopupComponent,
        EtablissementMySuffixDeleteDialogComponent,
        EtablissementMySuffixDeletePopupComponent,
    ],
    providers: [
        EtablissementMySuffixService,
        EtablissementMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1EtablissementMySuffixModule {}
