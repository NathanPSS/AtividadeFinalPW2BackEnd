import { FormProjectDto } from './dto/form-project.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { File } from 'fastify-multer/lib/interfaces';
import { DataSource, Repository } from 'typeorm';
import { Project } from './model/project.entity';
import { User } from '../user/model/user.entity';
import { Attachment } from './model/attachment.entity';
import { PhotoUser } from '../user/model/photo-user.entity';
export declare class ProjectService {
    private readonly firebase;
    private readonly repositoryProject;
    private readonly repositoryUser;
    private readonly repositoryProfile;
    private readonly repositoryAttachment;
    private readonly dataSource;
    constructor(firebase: FirebaseService, repositoryProject: Repository<Project>, repositoryUser: Repository<User>, repositoryProfile: Repository<PhotoUser>, repositoryAttachment: Repository<Attachment>, dataSource: DataSource);
    create(createProjectDto: FormProjectDto, author: number, file?: File): Promise<void>;
    findAll(): Promise<{
        profile: PhotoUser;
        attachment: Attachment;
        id: number;
        github?: string;
        prototype?: string;
        description: string;
        gpWhatzap: string;
        title: string;
        author: number;
        collaborators?: User[];
    }[]>;
    findOne(id: number): Promise<{
        attachment: Attachment;
        id: number;
        github?: string;
        prototype?: string;
        description: string;
        gpWhatzap: string;
        title: string;
        author: number;
        collaborators?: User[];
    }>;
    update(idProject: number, updateProjectDto: FormProjectDto, file?: File): Promise<void>;
    remove(id: number): Promise<void>;
    saveFirebase(file: any): void;
    bootstrapQueryRunner(): Promise<import("typeorm").QueryRunner>;
}
