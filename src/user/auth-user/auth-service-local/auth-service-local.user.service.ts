import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CompareHashDataService } from '../../../hash/compare-hash-data/compare-hash-data.service';
import { password } from '../types/password';



@Injectable()
export class AuthServiceLocalUserService {
    constructor(
      private compareHash :CompareHashDataService
    ){}

  
  public async validateData(password :password) {
        const isValidate =  await this.compareHash.compareHash(password.passwordPlain,password.passwordEncrypted)
        if(!isValidate){
          throw new UnauthorizedException('Error username or pass wrong')
        }

    }
}
