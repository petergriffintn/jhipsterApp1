import { BaseEntity } from './../../shared';

export class DiplomeMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public libelleFr?: string,
        public libelleAr?: string,
    ) {
    }
}
