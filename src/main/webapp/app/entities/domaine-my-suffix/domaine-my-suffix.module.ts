import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp1SharedModule } from '../../shared';
import {
    DomaineMySuffixService,
    DomaineMySuffixPopupService,
    DomaineMySuffixComponent,
    DomaineMySuffixDetailComponent,
    DomaineMySuffixDialogComponent,
    DomaineMySuffixPopupComponent,
    DomaineMySuffixDeletePopupComponent,
    DomaineMySuffixDeleteDialogComponent,
    domaineRoute,
    domainePopupRoute,
} from './';

const ENTITY_STATES = [
    ...domaineRoute,
    ...domainePopupRoute,
];

@NgModule({
    imports: [
        JhipsterApp1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DomaineMySuffixComponent,
        DomaineMySuffixDetailComponent,
        DomaineMySuffixDialogComponent,
        DomaineMySuffixDeleteDialogComponent,
        DomaineMySuffixPopupComponent,
        DomaineMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DomaineMySuffixComponent,
        DomaineMySuffixDialogComponent,
        DomaineMySuffixPopupComponent,
        DomaineMySuffixDeleteDialogComponent,
        DomaineMySuffixDeletePopupComponent,
    ],
    providers: [
        DomaineMySuffixService,
        DomaineMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1DomaineMySuffixModule {}
