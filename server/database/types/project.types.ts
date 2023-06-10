
export const validProjectStatus = ['In progress', 'Done'];
export interface IProject {
    id: string;
    projectName: string;
    startDate: Date;
    description: string;
    status: string;
}