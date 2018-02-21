import { BaseEntity } from './../../shared';

export class ProgrammeMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public libelleFr?: string,
        public libelleAr?: string,
        public specialiteId?: number,
    ) {
    }
}
