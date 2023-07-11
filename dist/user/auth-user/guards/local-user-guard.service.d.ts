import { CanActivate, ExecutionContext } from '@nestjs/common';
declare const LocalUserGuardService_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalUserGuardService extends LocalUserGuardService_base implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
