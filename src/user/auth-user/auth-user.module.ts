import { Module } from '@nestjs/common';
import { HashModule } from '../../hash/hash.module';

import { AuthServiceLocalUserService } from './auth-service-local/auth-service-local.user.service';
import { LocalUserGuardService } from './guards/local-user-guard.service';
import { LocalStrategyUserService } from './local-strategy-user/local-strategy-user.service';
import { SerializableUserService } from './serializable/serializable.service';
import { DatabaseUserAuthService } from './database-auth/database-auth.service';
import { DatabaseModule } from '../../database/database.module';
import { userRepository } from '../repository/user.repository';


@Module({
    imports: [HashModule,DatabaseModule],
    providers: [AuthServiceLocalUserService,LocalUserGuardService,LocalStrategyUserService,SerializableUserService, DatabaseUserAuthService,...userRepository],
    exports: [AuthServiceLocalUserService,LocalUserGuardService,LocalStrategyUserService]
})
export class AuthUserModule {}
