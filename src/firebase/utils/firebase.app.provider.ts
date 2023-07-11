import { Provider } from "@nestjs/common";
import { FirebaseApp, initializeApp } from "firebase/app"    

export const appFirebaseProvider :Provider = {
    provide:'FIREBASE_APP',
    useFactory: () => {
        const app = initializeApp(
            {
                apiKey: process.env.API_KEY,
                authDomain: process.env.AUTH_DOMAIN,
                projectId: process.env.PROJECT_ID,
                storageBucket: process.env.STORAGE_BUCKET,
                messagingSenderId: process.env.MESSAGING_SENDER_ID,
                appId: process.env.APP_ID,
            }
        )
        return app;
    },  
}