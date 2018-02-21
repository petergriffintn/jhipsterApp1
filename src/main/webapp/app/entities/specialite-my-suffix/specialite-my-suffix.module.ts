import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp1SharedModule } from '../../shared';
import {
    SpecialiteMySuffixService,
    SpecialiteMySuffixPopupService,
    SpecialiteMySuffixComponent,
    SpecialiteMySuffixDetailComponent,
    SpecialiteMySuffixDialogComponent,
    SpecialiteMySuffixPopupComponent,
    SpecialiteMySuffixDeletePopupComponent,
    SpecialiteMySuffixDeleteDialogComponent,
    specialiteRoute,
    specialitePopupRoute,
} from './';

const ENTITY_STATES = [
    ...specialiteRoute,
    ...specialitePopupRoute,
];

@NgModule({
    imports: [
        JhipsterApp1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SpecialiteMySuffixComponent,
        SpecialiteMySuffixDetailComponent,
        SpecialiteMySuffixDialogComponent,
        SpecialiteMySuffixDeleteDialogComponent,
        SpecialiteMySuffixPopupComponent,
        SpecialiteMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SpecialiteMySuffixComponent,
        SpecialiteMySuffixDialogComponent,
        SpecialiteMySuffixPopupComponent,
        SpecialiteMySuffixDeleteDialogComponent,
        SpecialiteMySuffixDeletePopupComponent,
    ],
    providers: [
        SpecialiteMySuffixService,
        SpecialiteMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1SpecialiteMySuffixModule {}
