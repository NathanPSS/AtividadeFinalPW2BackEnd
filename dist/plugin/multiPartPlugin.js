"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiPartPlugin = void 0;
const multer = require("fastify-multer");
const multiPartPlugin = (instance, options, done) => {
    const upload = multer();
    instance.addHook('preHandler', (req, reply) => {
        console.log(req);
    });
    done();
};
exports.multiPartPlugin = multiPartPlugin;
//# sourceMappingURL=multiPartPlugin.js.map