"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErrorHandlePostgree = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
class NotFoundErrorHandlePostgree {
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    handle(error) {
        if (error instanceof typeorm_1.EntityNotFoundError) {
            throw new common_1.NotFoundException('Not Found the Data');
        }
        if (this.nextHandler) {
            this.nextHandler.handle(error);
        }
    }
}
exports.NotFoundErrorHandlePostgree = NotFoundErrorHandlePostgree;
//# sourceMappingURL=NotFoundErrorPostgree.js.map