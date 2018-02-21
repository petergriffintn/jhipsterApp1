import { BaseEntity } from './../../shared';

export class DomaineMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public libelleFr?: string,
        public libelleAr?: string,
        public mentions?: BaseEntity[],
    ) {
    }
}
