"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const database_module_1 = require("../database/database.module");
const user_repository_1 = require("./repository/user.repository");
const database_execeptions_module_1 = require("../database/database-execeptions/database-execeptions.module");
const hash_module_1 = require("../hash/hash.module");
const auth_module_1 = require("../auth/auth.module");
const app_jwt_module_1 = require("../auth/app-jwt/app-jwt.module");
const auth_user_module_1 = require("./auth-user/auth-user.module");
const photo_user_repository_1 = require("./repository/photo-user.repository");
const firebase_module_1 = require("../firebase/firebase.module");
const MulterMiddleware_1 = require("../project/middleware/MulterMiddleware");
let UserModule = class UserModule {
    configure(consumer) {
        consumer.apply(MulterMiddleware_1.MulterMiddleware).forRoutes('user');
    }
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, database_execeptions_module_1.DatabaseExeceptionsModule, hash_module_1.HashModule, auth_module_1.AuthModule, app_jwt_module_1.AppJwtModule, auth_user_module_1.AuthUserModule, firebase_module_1.FirebaseModule],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, ...user_repository_1.userRepository, ...photo_user_repository_1.photoUserRepository],
        exports: [...user_repository_1.userRepository]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map