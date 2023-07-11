"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const local_user_guard_service_1 = require("./auth-user/guards/local-user-guard.service");
const jwt_guard_service_1 = require("../auth/app-jwt/guards/jwt-guard/jwt-guard.service");
const auth_jwt_service_1 = require("../auth/app-jwt/auth-jwt/auth-jwt.service");
let UserController = class UserController {
    constructor(userService, jwt) {
        this.userService = userService;
        this.jwt = jwt;
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    async login(req) {
        return await this.jwt.login(req.user);
    }
    async findOne(req) {
        const id = await this.jwt.decode(req.headers.authorization);
        return this.userService.findOne(id.username);
    }
    async findAll() {
        return this.userService.findAll();
    }
    async update(req) {
        const id = await this.jwt.decode(req.headers.authorization);
        const file = req.raw['file'];
        const userUpdate = req.raw['body'];
        return this.userService.update(userUpdate, +id.username, file);
    }
    async remove(req) {
        const id = await this.jwt.decode(req.headers.authorization);
        return this.userService.remove(+id.username);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(local_user_guard_service_1.LocalUserGuardService),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_service_1.JwtGuardService),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_service_1.JwtGuardService),
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_service_1.JwtGuardService),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_service_1.JwtGuardService),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_jwt_service_1.AuthJwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map