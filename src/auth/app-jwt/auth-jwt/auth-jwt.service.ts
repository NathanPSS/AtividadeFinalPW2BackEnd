import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtService {
    constructor(
        private jwt :JwtService,
    ){}

    async login(user :any) {
        const payload = {username :user.username , sub:user.Id}
        return {
            token: this.jwt.sign(payload)
        }
    }
    async decode(token :string){
         token = token.slice(7)
         const user = this.jwt.decode(token)
         return user
    }
}
