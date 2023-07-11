"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoUserRepository = void 0;
const photo_user_entity_1 = require("../model/photo-user.entity");
exports.photoUserRepository = [
    {
        provide: 'PHOTO_USER_REPOSITORY',
        useFactory: (datasource) => datasource.getRepository(photo_user_entity_1.PhotoUser),
        inject: ['DATA_SOURCE_DEV'],
    },
];
//# sourceMappingURL=photo-user.repository.js.map