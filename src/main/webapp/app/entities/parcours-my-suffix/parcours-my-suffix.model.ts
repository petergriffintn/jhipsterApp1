import { BaseEntity } from './../../shared';

export class ParcoursMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public libelleFr?: string,
        public libelleAr?: string,
        public diplomeId?: number,
        public mentionId?: number,
    ) {
    }
}
