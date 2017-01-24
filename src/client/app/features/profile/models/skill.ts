import { SkillType } from './skillType';
import { User } from './user';

export interface Skill {
    ID: number;
    Description : string;
    Type : SkillType;
    Status: string;
    Comments: string;
    Approvers : User[];
}
