import { JwtService } from '@nestjs/jwt';
export declare class AuthJwtService {
    private jwt;
    constructor(jwt: JwtService);
    login(user: any): Promise<{
        token: string;
    }>;
    decode(token: string): Promise<string | {
        [key: string]: any;
    }>;
}
