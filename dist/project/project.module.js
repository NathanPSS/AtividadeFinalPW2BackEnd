"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_controller_1 = require("./project.controller");
const firebase_module_1 = require("../firebase/firebase.module");
const MulterMiddleware_1 = require("./middleware/MulterMiddleware");
const app_jwt_module_1 = require("../auth/app-jwt/app-jwt.module");
const project_repository_1 = require("./repository/project.repository");
const database_module_1 = require("../database/database.module");
const user_module_1 = require("../user/user.module");
const hash_module_1 = require("../hash/hash.module");
const attachment_repository_1 = require("./repository/attachment.repository");
const photo_user_repository_1 = require("../user/repository/photo-user.repository");
let ProjectModule = class ProjectModule {
    configure(consumer) {
        consumer.apply(MulterMiddleware_1.MulterMiddleware).forRoutes('project');
    }
};
ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [firebase_module_1.FirebaseModule, app_jwt_module_1.AppJwtModule, database_module_1.DatabaseModule, user_module_1.UserModule, hash_module_1.HashModule],
        controllers: [project_controller_1.ProjectController],
        providers: [project_service_1.ProjectService, ...project_repository_1.projectRepository, ...attachment_repository_1.attachmentRepository, ...photo_user_repository_1.photoUserRepository],
        exports: [...project_repository_1.projectRepository]
    })
], ProjectModule);
exports.ProjectModule = ProjectModule;
//# sourceMappingURL=project.module.js.map