import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterApp1DomaineMySuffixModule } from './domaine-my-suffix/domaine-my-suffix.module';
import { JhipsterApp1MentionMySuffixModule } from './mention-my-suffix/mention-my-suffix.module';
import { JhipsterApp1DiplomeMySuffixModule } from './diplome-my-suffix/diplome-my-suffix.module';
import { JhipsterApp1ParcoursMySuffixModule } from './parcours-my-suffix/parcours-my-suffix.module';
import { JhipsterApp1SpecialiteMySuffixModule } from './specialite-my-suffix/specialite-my-suffix.module';
import { JhipsterApp1ProgrammeMySuffixModule } from './programme-my-suffix/programme-my-suffix.module';
import { JhipsterApp1UniversiteMySuffixModule } from './universite-my-suffix/universite-my-suffix.module';
import { JhipsterApp1EtablissementMySuffixModule } from './etablissement-my-suffix/etablissement-my-suffix.module';
import { JhipsterApp1UeMySuffixModule } from './ue-my-suffix/ue-my-suffix.module';
import { JhipsterApp1EeMySuffixModule } from './ee-my-suffix/ee-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterApp1DomaineMySuffixModule,
        JhipsterApp1MentionMySuffixModule,
        JhipsterApp1DiplomeMySuffixModule,
        JhipsterApp1ParcoursMySuffixModule,
        JhipsterApp1SpecialiteMySuffixModule,
        JhipsterApp1ProgrammeMySuffixModule,
        JhipsterApp1UniversiteMySuffixModule,
        JhipsterApp1EtablissementMySuffixModule,
        JhipsterApp1UeMySuffixModule,
        JhipsterApp1EeMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp1EntityModule {}
