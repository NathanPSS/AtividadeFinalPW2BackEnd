import { Inject, Injectable } from "@nestjs/common";
import { File } from "fastify-multer/lib/interfaces";
import { StorageReference, UploadMetadata, deleteObject, getBytes, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";




@Injectable()
export class FirebaseService {
    constructor(
        @Inject('FIREBASE_APP_STORAGE_REF')
        private ref: StorageReference
    ) {}

async saveInFirebase(file: File,filePath :string) {    
        let storageFirebase = ref(this.ref,filePath)
         await uploadBytes(storageFirebase, file.buffer,{contentType: file.mimetype})   
         return await getDownloadURL(storageFirebase)
    }

removeInFirebase(filePath: string) {
        let storageFirebase = ref(this.ref, filePath)
        deleteObject(storageFirebase)
    }

async updateInFirebase(file: File, projectTitle: string){
    let storageFirebase = ref(this.ref, `arquivos-anexos/${projectTitle}/${file.originalname}`)
    deleteObject(storageFirebase)
    uploadBytes(storageFirebase,file.buffer,{contentType: file.mimetype})
}

async urlDowloadFromFirebase(folder: string) {
      const folderRef = ref(this.ref,folder)
      const allFiles = await listAll(folderRef)
      const dowloadUrls = await Promise.all(
        allFiles.items.map((fileRef) => getDownloadURL(fileRef))
      );
      return dowloadUrls
    }
async updateFileFromFirebase(file: File,filePathForDelete :string,filePathForUpdate : string){
  let storageFirebaseForDelete = ref(this.ref,filePathForDelete)
  let storageFirebaseForUpdate = ref(this.ref,filePathForUpdate)
  await deleteObject(storageFirebaseForDelete)
  .then(async () =>{
    await uploadBytes(storageFirebaseForUpdate, file.buffer,{contentType: file.mimetype})  
  })
  .catch(() =>{
    throw new Error()
  })
  return await getDownloadURL(storageFirebaseForUpdate)
}

async deleteFileFromFirebase(filePathForDelete :string){
  let storageFirebaseForDelete = ref(this.ref,filePathForDelete)
    await deleteObject(storageFirebaseForDelete)
}
}