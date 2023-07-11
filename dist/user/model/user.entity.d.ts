import { Project } from "../../project/model/project.entity";
export declare class User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    github?: string;
    bio?: string;
    colabProjects?: Project[];
    serializable(): {
        id: number;
        username: string;
    };
}
