import { Class } from './class';

export interface Education {
    ID: number;
    Class :Class; 
    Degree : string;
    Grade : string;
    Percentage : string;
    YearOfPassing : string;
    FilePath: string;
    Status: string;
    Comments: string; 
}
