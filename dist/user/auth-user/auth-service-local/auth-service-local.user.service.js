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
exports.AuthServiceLocalUserService = void 0;
const common_1 = require("@nestjs/common");
const compare_hash_data_service_1 = require("../../../hash/compare-hash-data/compare-hash-data.service");
let AuthServiceLocalUserService = class AuthServiceLocalUserService {
    constructor(compareHash) {
        this.compareHash = compareHash;
    }
    async validateData(password) {
        const isValidate = await this.compareHash.compareHash(password.passwordPlain, password.passwordEncrypted);
        if (!isValidate) {
            throw new common_1.UnauthorizedException('Error username or pass wrong');
        }
    }
};
AuthServiceLocalUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [compare_hash_data_service_1.CompareHashDataService])
], AuthServiceLocalUserService);
exports.AuthServiceLocalUserService = AuthServiceLocalUserService;
//# sourceMappingURL=auth-service-local.user.service.js.map