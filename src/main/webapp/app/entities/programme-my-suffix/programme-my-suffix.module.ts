import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp1SharedModule } from '../../shared';
import {
    ProgrammeMySuffixService,
    ProgrammeMySuffixPopupService,
    ProgrammeMySuffixComponent,
    ProgrammeMySuffixDetailComponent,
    ProgrammeMySuffixDialogComponent,
    ProgrammeMySuffixPopupComponent,
    ProgrammeMySuffixDeletePopupComponent,
    ProgrammeMySuffixDeleteDialogComponent,
    programmeRoute,
    programmePopupRoute,
} from './';

const ENTITY_STATES = [
    ...programmeRoute,
    ...programmePopupRoute,
];

@NgModule({
    imports: [
        JhipsterApp1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProgrammeMySuffixComponent,
        ProgrammeMySuffixDetailComponent,
        ProgrammeMySuffixDialogComponent,
        ProgrammeMySuffixDeleteDialogComponent,
        ProgrammeMySuffixPopupComponent,
        ProgrammeMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProgrammeMySuffixComponent,
        ProgrammeMySuffixDialogComponent,
        ProgrammeMySuffixPopupComponent,
        ProgrammeMySuffixDeleteDialogComponent,
        ProgrammeMySuffixDeletePopupComponent,
    ],
    providers: [
        ProgrammeMySuffixService,
        ProgrammeMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1ProgrammeMySuffixModule {}
