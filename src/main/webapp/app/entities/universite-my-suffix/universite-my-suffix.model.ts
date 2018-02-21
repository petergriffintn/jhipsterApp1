import { BaseEntity } from './../../shared';

export class UniversiteMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public libelleFr?: string,
        public libelleAr?: string,
    ) {
    }
}
