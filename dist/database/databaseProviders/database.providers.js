"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBaseProviders = void 0;
const typeorm_1 = require("typeorm");
exports.dataBaseProviders = [
    {
        provide: 'DATA_SOURCE_DEV',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'postgres',
                url: process.env.DATABASE_URL_DEV,
                entities: [
                    __dirname + '/../../**/*.entity{.ts,.js}',
                ],
                synchronize: true
            });
            return dataSource.initialize();
        }
    },
];
//# sourceMappingURL=database.providers.js.map