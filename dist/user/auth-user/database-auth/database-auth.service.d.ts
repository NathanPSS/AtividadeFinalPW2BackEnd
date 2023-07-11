import { Repository } from 'typeorm';
import { User } from '../../model/user.entity';
import { AuthServiceLocalUserService } from '../auth-service-local/auth-service-local.user.service';
import { Login } from '../types/login';
export declare class DatabaseUserAuthService {
    private repository;
    private auth;
    constructor(repository: Repository<User>, auth: AuthServiceLocalUserService);
    findOneLogin(login: Login): Promise<{
        username: number;
    }>;
}
