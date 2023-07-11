"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryKeyErrorHandlePostgree = void 0;
const common_1 = require("@nestjs/common");
class PrimaryKeyErrorHandlePostgree {
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    handle(error) {
        if (error.code === '23505') {
            throw new common_1.ForbiddenException('Primary Key Violation');
        }
        if (this.nextHandler) {
            this.nextHandler.handle(error);
        }
    }
}
exports.PrimaryKeyErrorHandlePostgree = PrimaryKeyErrorHandlePostgree;
//# sourceMappingURL=UniquePrimaryKeyErrorPostgree.js.map