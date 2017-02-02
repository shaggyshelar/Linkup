import { SelectValidation } from './selectValidation';

export interface CertificationFormValidation {
    id: number;
    option: SelectValidation;
    code: SelectValidation;
    fromEspl: boolean;
    date: string;
}
