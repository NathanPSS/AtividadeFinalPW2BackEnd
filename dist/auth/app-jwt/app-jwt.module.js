"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppJwtModule = void 0;
const common_1 = require("@nestjs/common");
const auth_jwt_service_1 = require("./auth-jwt/auth-jwt.service");
const jwt_strategy_service_1 = require("./jwt-strategy/jwt-strategy.service");
const jwt_guard_service_1 = require("./guards/jwt-guard/jwt-guard.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AppJwtModule = class AppJwtModule {
};
AppJwtModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: '1d'
                    }
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [auth_jwt_service_1.AuthJwtService, jwt_strategy_service_1.JwtStrategy, jwt_guard_service_1.JwtGuardService],
        exports: [auth_jwt_service_1.AuthJwtService, jwt_strategy_service_1.JwtStrategy]
    })
], AppJwtModule);
exports.AppJwtModule = AppJwtModule;
//# sourceMappingURL=app-jwt.module.js.map