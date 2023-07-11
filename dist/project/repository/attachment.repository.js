"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentRepository = void 0;
const attachment_entity_1 = require("../model/attachment.entity");
exports.attachmentRepository = [
    {
        provide: 'ATTACHMENT_REPOSITORY',
        useFactory: (datasource) => datasource.getRepository(attachment_entity_1.Attachment),
        inject: ['DATA_SOURCE_DEV'],
    },
];
//# sourceMappingURL=attachment.repository.js.map