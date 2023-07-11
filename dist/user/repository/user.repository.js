"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_entity_1 = require("../model/user.entity");
exports.userRepository = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (datasource) => datasource.getRepository(user_entity_1.User),
        inject: ['DATA_SOURCE_DEV'],
    },
];
//# sourceMappingURL=user.repository.js.map