import { Module } from '@nestjs/common';
import { appFirebaseProvider } from './utils/firebase.app.provider';
import { appStorageProvider } from './utils/firebase.app.storage.provider';
import { appStorageRefProvider } from './utils/firebase.app.storage.ref.provider';
import { FirebaseService } from './firebase.service';



@Module({
  providers: [appFirebaseProvider,appStorageProvider,appStorageRefProvider,FirebaseService],
  exports: [appFirebaseProvider,appStorageProvider,appStorageRefProvider,FirebaseService],
})
export class FirebaseModule {}
