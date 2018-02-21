import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp1SharedModule } from '../../shared';
import {
    UeMySuffixService,
    UeMySuffixPopupService,
    UeMySuffixComponent,
    UeMySuffixDetailComponent,
    UeMySuffixDialogComponent,
    UeMySuffixPopupComponent,
    UeMySuffixDeletePopupComponent,
    UeMySuffixDeleteDialogComponent,
    ueRoute,
    uePopupRoute,
} from './';

const ENTITY_STATES = [
    ...ueRoute,
    ...uePopupRoute,
];

@NgModule({
    imports: [
        JhipsterApp1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UeMySuffixComponent,
        UeMySuffixDetailComponent,
        UeMySuffixDialogComponent,
        UeMySuffixDeleteDialogComponent,
        UeMySuffixPopupComponent,
        UeMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        UeMySuffixComponent,
        UeMySuffixDialogComponent,
        UeMySuffixPopupComponent,
        UeMySuffixDeleteDialogComponent,
        UeMySuffixDeletePopupComponent,
    ],
    providers: [
        UeMySuffixService,
        UeMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1UeMySuffixModule {}
