import { Injectable, NotFoundException, Provider, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { DatabaseUserAuthService } from '../database-auth/database-auth.service';

@Injectable()
export class LocalStrategyUserService extends PassportStrategy(Strategy,'local-user'){
    
    constructor(
        private service :DatabaseUserAuthService
    ){
        super()
    }
  async validate(username :string,password :string){

    const userOrException = await this.service.findOneLogin({username:username , password: password})

    if (userOrException === null){
        throw new UnauthorizedException('Username or Password Wrong')
    }
    return userOrException
}
}
