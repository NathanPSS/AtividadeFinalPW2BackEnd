import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class JwtGuardService extends AuthGuard('jwt') implements CanActivate{
   
    
}
