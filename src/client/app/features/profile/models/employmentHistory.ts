import { LastEmploymentHistory } from './lastEmploymentHistory';

export interface EmploymentHistory {
    ID: number;
    EmploymentDetail: string;
    StartDate: string;
    EndDate: string;
    Duration: string;
    Designation: string;
    LastEmploymentHistory : LastEmploymentHistory;
    Status: string;
    Comments: string;
}
