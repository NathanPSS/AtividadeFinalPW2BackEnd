import { ProjectService } from './project.service';
import { FastifyRequest } from 'fastify';
import { AuthJwtService } from '../auth/app-jwt/auth-jwt/auth-jwt.service';
export declare class ProjectController {
    private readonly projectService;
    private readonly jwt;
    constructor(projectService: ProjectService, jwt: AuthJwtService);
    create(req: FastifyRequest): Promise<number>;
    findAll(): Promise<{
        profile: import("../user/model/photo-user.entity").PhotoUser;
        attachment: import("./model/attachment.entity").Attachment;
        id: number;
        github?: string;
        prototype?: string;
        description: string;
        gpWhatzap: string;
        title: string;
        author: number;
        collaborators?: import("../user/model/user.entity").User[];
    }[]>;
    findOne(id: string): Promise<{
        attachment: import("./model/attachment.entity").Attachment;
        id: number;
        github?: string;
        prototype?: string;
        description: string;
        gpWhatzap: string;
        title: string;
        author: number;
        collaborators?: import("../user/model/user.entity").User[];
    }>;
    update(id: string, req: FastifyRequest): Promise<void>;
    remove(id: string): Promise<void>;
    saveInFirebase(req: FastifyRequest): number;
}
