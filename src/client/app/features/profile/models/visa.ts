import { Country } from './country';

export interface Visa {
    ID: number;
    Number: string;
    ExpDate: string;
    Type: string;
    Status: string;
    Comments: string;
    FilePath: string;
    Country: Country;
}
