import { BaseEntity } from './../../shared';

export class EeMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public ueId?: number,
    ) {
    }
}
