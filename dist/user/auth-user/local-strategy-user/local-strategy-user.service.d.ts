import { Strategy } from 'passport-local';
import { DatabaseUserAuthService } from '../database-auth/database-auth.service';
declare const LocalStrategyUserService_base: new (...args: any[]) => Strategy;
export declare class LocalStrategyUserService extends LocalStrategyUserService_base {
    private service;
    constructor(service: DatabaseUserAuthService);
    validate(username: string, password: string): Promise<{
        username: number;
    }>;
}
export {};
