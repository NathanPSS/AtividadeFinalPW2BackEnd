"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForeingKeyErrorHandlePostgree = void 0;
const common_1 = require("@nestjs/common");
class ForeingKeyErrorHandlePostgree {
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    handle(error) {
        if (error.code === '25003') {
            throw new common_1.ForbiddenException('Foreing Key Violation');
        }
        if (this.nextHandler) {
            this.nextHandler.handle(error);
        }
    }
}
exports.ForeingKeyErrorHandlePostgree = ForeingKeyErrorHandlePostgree;
//# sourceMappingURL=ForeingKeyErrorHandle.js.map