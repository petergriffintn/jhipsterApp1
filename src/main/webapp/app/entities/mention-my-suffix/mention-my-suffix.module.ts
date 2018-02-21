import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp1SharedModule } from '../../shared';
import {
    MentionMySuffixService,
    MentionMySuffixPopupService,
    MentionMySuffixComponent,
    MentionMySuffixDetailComponent,
    MentionMySuffixDialogComponent,
    MentionMySuffixPopupComponent,
    MentionMySuffixDeletePopupComponent,
    MentionMySuffixDeleteDialogComponent,
    mentionRoute,
    mentionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mentionRoute,
    ...mentionPopupRoute,
];

@NgModule({
    imports: [
        JhipsterApp1SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MentionMySuffixComponent,
        MentionMySuffixDetailComponent,
        MentionMySuffixDialogComponent,
        MentionMySuffixDeleteDialogComponent,
        MentionMySuffixPopupComponent,
        MentionMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MentionMySuffixComponent,
        MentionMySuffixDialogComponent,
        MentionMySuffixPopupComponent,
        MentionMySuffixDeleteDialogComponent,
        MentionMySuffixDeletePopupComponent,
    ],
    providers: [
        MentionMySuffixService,
        MentionMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1MentionMySuffixModule {}
