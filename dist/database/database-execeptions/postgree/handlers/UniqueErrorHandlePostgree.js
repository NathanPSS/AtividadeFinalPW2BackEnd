"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueErrorHandlePostgree = void 0;
const common_1 = require("@nestjs/common");
class UniqueErrorHandlePostgree {
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    handle(error) {
        if (error.code === '23000') {
            throw new common_1.ForbiddenException('Unique Constraint Violation');
        }
        if (this.nextHandler) {
            this.nextHandler.handle(error);
        }
    }
}
exports.UniqueErrorHandlePostgree = UniqueErrorHandlePostgree;
//# sourceMappingURL=UniqueErrorHandlePostgree.js.map