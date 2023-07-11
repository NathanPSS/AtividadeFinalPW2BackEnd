import { Module } from '@nestjs/common';
import { AuthJwtService } from './auth-jwt/auth-jwt.service';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.service';
import { JwtGuardService } from './guards/jwt-guard/jwt-guard.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: '1d'
            }
          }),
          inject: [ConfigService],
        }),
    ],
    providers: [AuthJwtService,JwtStrategy, JwtGuardService],
    exports: [AuthJwtService,JwtStrategy]
})
export class AppJwtModule {}
