import { BaseEntity } from './../../shared';

export class EtablissementMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public libelleFr?: string,
        public libelleAr?: string,
        public universiteId?: number,
    ) {
    }
}
