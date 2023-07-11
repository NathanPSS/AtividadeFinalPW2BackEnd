import { User } from "../../user/model/user.entity";
export declare class Project {
    id: number;
    github?: string;
    prototype?: string;
    description: string;
    gpWhatzap: string;
    title: string;
    author: number;
    collaborators?: User[];
}
