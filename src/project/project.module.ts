import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { MulterMiddleware } from './middleware/MulterMiddleware';
import { AppJwtModule } from '../auth/app-jwt/app-jwt.module';
import { projectRepository } from './repository/project.repository';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { HashModule } from '../hash/hash.module';
import { attachmentRepository } from './repository/attachment.repository';
import { photoUserRepository } from '../user/repository/photo-user.repository';

@Module({
  imports: [FirebaseModule,AppJwtModule,DatabaseModule,UserModule,HashModule],
  controllers: [ProjectController],
  providers: [ProjectService,...projectRepository,...attachmentRepository,...photoUserRepository],
  exports: [...projectRepository]
})
export class ProjectModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(MulterMiddleware).forRoutes('project')
      
  }
}
