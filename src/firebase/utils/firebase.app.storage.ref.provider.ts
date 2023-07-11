import { Provider } from "@nestjs/common";
import { FirebaseStorage,ref } from 'firebase/storage'



export const appStorageRefProvider :Provider = {
   inject:['FIREBASE_APP_STORAGE'],
   provide: 'FIREBASE_APP_STORAGE_REF',
   useFactory: (firebaseStorage :FirebaseStorage) => {
         const storageRef = ref(firebaseStorage)
          return storageRef
   }
}