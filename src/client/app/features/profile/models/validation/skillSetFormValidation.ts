import { SelectValidation } from './selectValidation';

export interface SkillSetFormValidation {
  id: number;
  skillType: SelectValidation;
  skills: string;
}
