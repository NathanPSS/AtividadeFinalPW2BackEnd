import { File } from "fastify-multer/lib/interfaces";
import { StorageReference } from "firebase/storage";
export declare class FirebaseService {
    private ref;
    constructor(ref: StorageReference);
    saveInFirebase(file: File, filePath: string): Promise<string>;
    removeInFirebase(filePath: string): void;
    updateInFirebase(file: File, projectTitle: string): Promise<void>;
    urlDowloadFromFirebase(folder: string): Promise<string[]>;
    updateFileFromFirebase(file: File, filePathForDelete: string, filePathForUpdate: string): Promise<string>;
    deleteFileFromFirebase(filePathForDelete: string): Promise<void>;
}
