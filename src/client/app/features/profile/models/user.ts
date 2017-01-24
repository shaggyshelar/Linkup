import { Contact } from './contact';
import { PF } from './pf';

export interface User {
    ID: number;
    Name: string;
    DOB: string;
    PF: PF;
    Contact: Contact;
    ContactNo: string;
    CurrentAdd: string;
    Email: string;
    CareerStartDate: string;
    LastWorkingDayOfPrevEmployer: string;
    BloodGroup: string;
    SkypeID: string;
    ProfilePath: string;
    UserName: string;
    Password: string;
}
