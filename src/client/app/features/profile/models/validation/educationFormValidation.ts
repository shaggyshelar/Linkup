import { SelectValidation } from './selectValidation';

export interface EducationFormValidation {
    id: number;
    degree: string;
    percentage: string;
    yearOfPassing: string;
    class: SelectValidation;
    grade: SelectValidation;
}
