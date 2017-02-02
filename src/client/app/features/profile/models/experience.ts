import { Project } from './project';
import { Client } from './client';

export interface Experience {
    Project: Project;
    StartDate: string;
    EndDate: string;
    Client: Client;
    Role: string;
    Environment: string;
    Duration: string;
    IsCurrentProject: boolean;
    Responsibilites: string;
    Description: string;
    Status: string;
    Comments: string;
    ExperienceFilePath: string;
}
