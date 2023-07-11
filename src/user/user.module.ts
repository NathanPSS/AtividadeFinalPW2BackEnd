import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { userRepository } from './repository/user.repository';
import { DatabaseExeceptionsModule } from '../database/database-execeptions/database-execeptions.module';
import { HashModule } from '../hash/hash.module';
import { LocalUserGuardService } from './auth-user/guards/local-user-guard.service';

import { AuthModule } from '../auth/auth.module';
import { AppJwtModule } from '../auth/app-jwt/app-jwt.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { photoUserRepository } from './repository/photo-user.repository';
import { FirebaseModule } from '../firebase/firebase.module';
import { MulterMiddleware } from '../project/middleware/MulterMiddleware';
import { ProjectModule } from '../project/project.module';




@Module({
  imports: [DatabaseModule,DatabaseExeceptionsModule,HashModule,AuthModule,AppJwtModule,AuthUserModule,FirebaseModule],
  controllers: [UserController],
  providers: [UserService,...userRepository,...photoUserRepository],
  exports: [...userRepository]
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(MulterMiddleware).forRoutes('user')
  }
}

