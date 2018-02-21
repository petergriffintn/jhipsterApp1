import { BaseEntity } from './../../shared';

export const enum TypeUe {
    'OBLIGATOIRE',
    'OPTIONNEL'
}

export const enum Qualification {
    'ENSEIGNEMENT',
    'PROJET'
}

export const enum RegimeExamen {
    'MX',
    'CC'
}

export const enum Nature {
    'TRANSVERSALE',
    'FONDAMENTALE'
}

export class UeMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public type?: TypeUe,
        public qualif?: Qualification,
        public regime?: RegimeExamen,
        public nature?: Nature,
        public programmeId?: number,
    ) {
    }
}
