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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategyUserService = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const database_auth_service_1 = require("../database-auth/database-auth.service");
let LocalStrategyUserService = class LocalStrategyUserService extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'local-user') {
    constructor(service) {
        super();
        this.service = service;
    }
    async validate(username, password) {
        const userOrException = await this.service.findOneLogin({ username: username, password: password });
        if (userOrException === null) {
            throw new common_1.UnauthorizedException('Username or Password Wrong');
        }
        return userOrException;
    }
};
LocalStrategyUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_auth_service_1.DatabaseUserAuthService])
], LocalStrategyUserService);
exports.LocalStrategyUserService = LocalStrategyUserService;
//# sourceMappingURL=local-strategy-user.service.js.map