import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { FirebaseModule } from './firebase/firebase.module';






@Module({
  imports: [UserModule,ConfigModule.forRoot(),DatabaseModule, AuthModule, ProjectModule, FirebaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
