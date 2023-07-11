"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appStorageRefProvider = void 0;
const storage_1 = require("firebase/storage");
exports.appStorageRefProvider = {
    inject: ['FIREBASE_APP_STORAGE'],
    provide: 'FIREBASE_APP_STORAGE_REF',
    useFactory: (firebaseStorage) => {
        const storageRef = (0, storage_1.ref)(firebaseStorage);
        return storageRef;
    }
};
//# sourceMappingURL=firebase.app.storage.ref.provider.js.map