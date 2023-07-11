import { PassportSerializer } from '@nestjs/passport';
export declare class SerializableUserService extends PassportSerializer {
    deserializeUser(payload: any, done: Function): void;
    serializeUser(user: any, done: Function): void;
}
