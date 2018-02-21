import { BaseEntity } from './../../shared';

export class MentionMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public libelleFr?: string,
        public libelleAr?: string,
        public domaineId?: number,
    ) {
    }
}
