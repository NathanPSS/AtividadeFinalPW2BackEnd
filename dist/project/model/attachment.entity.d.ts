import { Project } from "./project.entity";
export declare class Attachment {
    projectId: number;
    project: Project;
    firebaseUrlFile: string;
    storageReference: string;
}
