"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execptionsPostgreeService = exports.ExecptionsPostgreeService = void 0;
const common_1 = require("@nestjs/common");
const ForeingKeyErrorHandle_1 = require("./handlers/ForeingKeyErrorHandle");
const NotFoundErrorPostgree_1 = require("./handlers/NotFoundErrorPostgree");
const UniqueErrorHandlePostgree_1 = require("./handlers/UniqueErrorHandlePostgree");
const UniquePrimaryKeyErrorPostgree_1 = require("./handlers/UniquePrimaryKeyErrorPostgree");
class ExecptionsPostgreeService {
    checkError(error) {
        const handlers = this.factoryHandlers();
        handlers.forEach((handle, index) => {
            handle.handle(error);
            if (index === (handlers.length - 1)) {
                throw new common_1.ForbiddenException('A Exception not Maped occour in database');
            }
            handle.setNext(handlers[index + 1]);
        });
    }
    factoryHandlers() {
        const handlers = [
            new UniqueErrorHandlePostgree_1.UniqueErrorHandlePostgree,
            new ForeingKeyErrorHandle_1.ForeingKeyErrorHandlePostgree,
            new UniquePrimaryKeyErrorPostgree_1.PrimaryKeyErrorHandlePostgree,
            new NotFoundErrorPostgree_1.NotFoundErrorHandlePostgree,
        ];
        return handlers;
    }
}
exports.ExecptionsPostgreeService = ExecptionsPostgreeService;
exports.execptionsPostgreeService = {
    provide: 'EXCEPTIONS_POSTGREE',
    useClass: ExecptionsPostgreeService
};
//# sourceMappingURL=postgree.service.js.map