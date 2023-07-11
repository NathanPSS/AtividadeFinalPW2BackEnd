import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthJwtService } from '../auth/app-jwt/auth-jwt/auth-jwt.service';
import { FastifyRequest } from 'fastify';
export declare class UserController {
    private readonly userService;
    private readonly jwt;
    constructor(userService: UserService, jwt: AuthJwtService);
    create(createUserDto: CreateUserDto): Promise<void>;
    login(req: any): Promise<{
        token: string;
    }>;
    findOne(req: FastifyRequest): Promise<import("@nestjs/common").NotFoundException | {
        profile: import("./model/photo-user.entity").PhotoUser;
        id: number;
        name: string;
        lastName: string;
        email: string;
        password: string;
        phone?: string;
        github?: string;
        bio?: string;
        colabProjects?: import("../project/model/project.entity").Project[];
    }>;
    findAll(): Promise<import("./model/user.entity").User[]>;
    update(req: FastifyRequest): Promise<void>;
    remove(req: FastifyRequest): Promise<void>;
}
