"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appFirebaseProvider = void 0;
const app_1 = require("firebase/app");
exports.appFirebaseProvider = {
    provide: 'FIREBASE_APP',
    useFactory: () => {
        const app = (0, app_1.initializeApp)({
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
        });
        return app;
    },
};
//# sourceMappingURL=firebase.app.provider.js.map