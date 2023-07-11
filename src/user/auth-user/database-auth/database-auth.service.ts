import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../model/user.entity';
import { AuthServiceLocalUserService } from '../auth-service-local/auth-service-local.user.service';
import { Login } from '../types/login';
import { password } from '../types/password';

@Injectable()
export class DatabaseUserAuthService {
    constructor(
        @Inject('USER_REPOSITORY')
        private repository: Repository<User>,
        private auth :AuthServiceLocalUserService
    ){}
    async findOneLogin(login :Login){
        try{
        const user = await this.repository.findOneByOrFail({
          email:login.username
        })
        const password :password = {
          passwordEncrypted: user.password,
          passwordPlain: login.password
        }
       await this.auth.validateData(password)
       const userLoged = {
        username: user.id
       }
       return userLoged
        } catch (error){
               return null
        }
      }
      
}
