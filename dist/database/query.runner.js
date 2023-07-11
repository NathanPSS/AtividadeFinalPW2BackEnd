"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRunnerProvider = void 0;
exports.queryRunnerProvider = {
    provide: 'QUERY_RUNNER',
    inject: ['DATA_SOURCE_DEV'],
    useFactory: async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        return queryRunner;
    }
};
//# sourceMappingURL=query.runner.js.map