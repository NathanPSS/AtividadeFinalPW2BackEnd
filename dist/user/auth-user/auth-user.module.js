"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserModule = void 0;
const common_1 = require("@nestjs/common");
const hash_module_1 = require("../../hash/hash.module");
const auth_service_local_user_service_1 = require("./auth-service-local/auth-service-local.user.service");
const local_user_guard_service_1 = require("./guards/local-user-guard.service");
const local_strategy_user_service_1 = require("./local-strategy-user/local-strategy-user.service");
const serializable_service_1 = require("./serializable/serializable.service");
const database_auth_service_1 = require("./database-auth/database-auth.service");
const database_module_1 = require("../../database/database.module");
const user_repository_1 = require("../repository/user.repository");
let AuthUserModule = class AuthUserModule {
};
AuthUserModule = __decorate([
    (0, common_1.Module)({
        imports: [hash_module_1.HashModule, database_module_1.DatabaseModule],
        providers: [auth_service_local_user_service_1.AuthServiceLocalUserService, local_user_guard_service_1.LocalUserGuardService, local_strategy_user_service_1.LocalStrategyUserService, serializable_service_1.SerializableUserService, database_auth_service_1.DatabaseUserAuthService, ...user_repository_1.userRepository],
        exports: [auth_service_local_user_service_1.AuthServiceLocalUserService, local_user_guard_service_1.LocalUserGuardService, local_strategy_user_service_1.LocalStrategyUserService]
    })
], AuthUserModule);
exports.AuthUserModule = AuthUserModule;
//# sourceMappingURL=auth-user.module.js.map