import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp1SharedModule } from '../../shared';
import {
    UniversiteMySuffixService,
    UniversiteMySuffixPopupService,
    UniversiteMySuffixComponent,
    UniversiteMySuffixDetailComponent,
    UniversiteMySuffixDialogComponent,
    UniversiteMySuffixPopupComponent,
    UniversiteMySuffixDeletePopupComponent,
    UniversiteMySuffixDeleteDialogComponent,
    universiteRoute,
    universitePopupRoute,
} from './';

const ENTITY_STATES = [
    ...universiteRoute,
    ...universitePopupRoute,
];

@NgModule({
    imports: [
        JhipsterApp1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UniversiteMySuffixComponent,
        UniversiteMySuffixDetailComponent,
        UniversiteMySuffixDialogComponent,
        UniversiteMySuffixDeleteDialogComponent,
        UniversiteMySuffixPopupComponent,
        UniversiteMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        UniversiteMySuffixComponent,
        UniversiteMySuffixDialogComponent,
        UniversiteMySuffixPopupComponent,
        UniversiteMySuffixDeleteDialogComponent,
        UniversiteMySuffixDeletePopupComponent,
    ],
    providers: [
        UniversiteMySuffixService,
        UniversiteMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1UniversiteMySuffixModule {}
