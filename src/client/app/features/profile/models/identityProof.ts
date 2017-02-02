import { IdProofType } from './idProofType';

export interface IdentityProof {
    ID: number;
    Type: IdProofType;
    Value: string;
    Status: string;
    Comments: string;
    FilePath: string;
}
