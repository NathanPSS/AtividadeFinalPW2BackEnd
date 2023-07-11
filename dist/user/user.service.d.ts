import { IDatabaseExeptions } from '../database/database-execeptions/IDatabaseExceptions';
import { HashDataService } from '../hash/hash-data/hash-data.service';
import { NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { File } from 'fastify-multer/lib/interfaces';
import { PhotoUser } from './model/photo-user.entity';
import { Project } from '../project/model/project.entity';
export declare class UserService {
    private repository;
    private exceptions;
    private hash;
    private readonly repositoryPhoto;
    private readonly dataSource;
    private readonly firebase;
    constructor(repository: Repository<User>, exceptions: IDatabaseExeptions, hash: HashDataService, repositoryPhoto: Repository<PhotoUser>, dataSource: DataSource, firebase: FirebaseService);
    create(createUserDto: CreateUserDto): Promise<void>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<NotFoundException | {
        profile: PhotoUser;
        id: number;
        name: string;
        lastName: string;
        email: string;
        password: string;
        phone?: string;
        github?: string;
        bio?: string;
        colabProjects?: Project[];
    }>;
    update(updateUserDto: any, id: number, file?: File): Promise<void>;
    remove(id: number): Promise<void>;
    bootstrapQueryRunner(): Promise<import("typeorm").QueryRunner>;
}
