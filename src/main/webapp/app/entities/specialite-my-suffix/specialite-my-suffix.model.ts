import { BaseEntity } from './../../shared';

export const enum TypeSpecialite {
    'TC',
    'SPEC'
}

export class SpecialiteMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public libelleFr?: string,
        public libelleAr?: string,
        public type?: TypeSpecialite,
        public etablissementId?: number,
        public parcoursId?: number,
    ) {
    }
}
