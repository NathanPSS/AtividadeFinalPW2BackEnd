"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("firebase/storage");
let FirebaseService = class FirebaseService {
    constructor(ref) {
        this.ref = ref;
    }
    async saveInFirebase(file, filePath) {
        let storageFirebase = (0, storage_1.ref)(this.ref, filePath);
        await (0, storage_1.uploadBytes)(storageFirebase, file.buffer, { contentType: file.mimetype });
        return await (0, storage_1.getDownloadURL)(storageFirebase);
    }
    removeInFirebase(filePath) {
        let storageFirebase = (0, storage_1.ref)(this.ref, filePath);
        (0, storage_1.deleteObject)(storageFirebase);
    }
    async updateInFirebase(file, projectTitle) {
        let storageFirebase = (0, storage_1.ref)(this.ref, `arquivos-anexos/${projectTitle}/${file.originalname}`);
        (0, storage_1.deleteObject)(storageFirebase);
        (0, storage_1.uploadBytes)(storageFirebase, file.buffer, { contentType: file.mimetype });
    }
    async urlDowloadFromFirebase(folder) {
        const folderRef = (0, storage_1.ref)(this.ref, folder);
        const allFiles = await (0, storage_1.listAll)(folderRef);
        const dowloadUrls = await Promise.all(allFiles.items.map((fileRef) => (0, storage_1.getDownloadURL)(fileRef)));
        return dowloadUrls;
    }
    async updateFileFromFirebase(file, filePathForDelete, filePathForUpdate) {
        let storageFirebaseForDelete = (0, storage_1.ref)(this.ref, filePathForDelete);
        let storageFirebaseForUpdate = (0, storage_1.ref)(this.ref, filePathForUpdate);
        await (0, storage_1.deleteObject)(storageFirebaseForDelete)
            .then(async () => {
            await (0, storage_1.uploadBytes)(storageFirebaseForUpdate, file.buffer, { contentType: file.mimetype });
        })
            .catch(() => {
            throw new Error();
        });
        return await (0, storage_1.getDownloadURL)(storageFirebaseForUpdate);
    }
    async deleteFileFromFirebase(filePathForDelete) {
        let storageFirebaseForDelete = (0, storage_1.ref)(this.ref, filePathForDelete);
        await (0, storage_1.deleteObject)(storageFirebaseForDelete);
    }
};
FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FIREBASE_APP_STORAGE_REF')),
    __metadata("design:paramtypes", [Object])
], FirebaseService);
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=firebase.service.js.map