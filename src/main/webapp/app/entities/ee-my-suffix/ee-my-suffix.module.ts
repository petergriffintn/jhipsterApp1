import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp1SharedModule } from '../../shared';
import {
    EeMySuffixService,
    EeMySuffixPopupService,
    EeMySuffixComponent,
    EeMySuffixDetailComponent,
    EeMySuffixDialogComponent,
    EeMySuffixPopupComponent,
    EeMySuffixDeletePopupComponent,
    EeMySuffixDeleteDialogComponent,
    eeRoute,
    eePopupRoute,
} from './';

const ENTITY_STATES = [
    ...eeRoute,
    ...eePopupRoute,
];

@NgModule({
    imports: [
        JhipsterApp1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EeMySuffixComponent,
        EeMySuffixDetailComponent,
        EeMySuffixDialogComponent,
        EeMySuffixDeleteDialogComponent,
        EeMySuffixPopupComponent,
        EeMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EeMySuffixComponent,
        EeMySuffixDialogComponent,
        EeMySuffixPopupComponent,
        EeMySuffixDeleteDialogComponent,
        EeMySuffixDeletePopupComponent,
    ],
    providers: [
        EeMySuffixService,
        EeMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1EeMySuffixModule {}
