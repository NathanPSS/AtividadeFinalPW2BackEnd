import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppJwtModule } from './app-jwt/app-jwt.module';

@Module({
  imports: [AppJwtModule],
  providers: [],
})
export class AuthModule {}
