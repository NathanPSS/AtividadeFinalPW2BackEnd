"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appStorageProvider = void 0;
const storage_1 = require("firebase/storage");
exports.appStorageProvider = {
    inject: ['FIREBASE_APP'],
    provide: 'FIREBASE_APP_STORAGE',
    useFactory: (firebaseApp) => {
        const storage = (0, storage_1.getStorage)(firebaseApp);
        return storage;
    }
};
//# sourceMappingURL=firebase.app.storage.provider.js.map