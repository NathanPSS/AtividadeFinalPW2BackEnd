import { Provider } from "@nestjs/common";
import { FirebaseApp } from "firebase/app";
import { getStorage,ref } from 'firebase/storage'



export const appStorageProvider :Provider = {
   inject:['FIREBASE_APP'],
   provide: 'FIREBASE_APP_STORAGE',
   useFactory: (firebaseApp :FirebaseApp) => {
         const storage = getStorage(firebaseApp)
          return storage
   }
}