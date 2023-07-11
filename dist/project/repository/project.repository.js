"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRepository = void 0;
const project_entity_1 = require("../model/project.entity");
exports.projectRepository = [
    {
        provide: 'PROJECT_REPOSITORY',
        useFactory: (datasource) => datasource.getRepository(project_entity_1.Project),
        inject: ['DATA_SOURCE_DEV'],
    },
];
//# sourceMappingURL=project.repository.js.map