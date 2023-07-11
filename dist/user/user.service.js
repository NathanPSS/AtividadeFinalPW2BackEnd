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
exports.UserService = void 0;
const hash_data_service_1 = require("../hash/hash-data/hash-data.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./model/user.entity");
const firebase_service_1 = require("../firebase/firebase.service");
const photo_user_entity_1 = require("./model/photo-user.entity");
let UserService = class UserService {
    constructor(repository, exceptions, hash, repositoryPhoto, dataSource, firebase) {
        this.repository = repository;
        this.exceptions = exceptions;
        this.hash = hash;
        this.repositoryPhoto = repositoryPhoto;
        this.dataSource = dataSource;
        this.firebase = firebase;
    }
    async create(createUserDto) {
        createUserDto.password = await this.hash.hashData(createUserDto.password, 10);
        try {
            await this.repository.save(createUserDto);
        }
        catch (error) {
            this.exceptions.checkError(error);
        }
    }
    async findAll() {
        try {
            return await this.repository.find();
        }
        catch (error) {
            this.exceptions.checkError(error);
        }
    }
    async findOne(id) {
        try {
            const user = await this.repository.findOneByOrFail({
                id: id
            });
            const profile = await this.repositoryPhoto.findOneBy({
                userId: id
            });
            return Object.assign(Object.assign({}, user), { profile: profile });
        }
        catch (error) {
            return new common_1.NotFoundException();
        }
    }
    async update(updateUserDto, id, file) {
        const entity = Object.assign(Object.assign({}, updateUserDto), { id: id });
        const photoUserDatabase = await this.repositoryPhoto.findOne({
            where: {
                userId: id
            }
        });
        const queryRunner = await this.bootstrapQueryRunner();
        try {
            await queryRunner.manager.save(user_entity_1.User, entity);
            if (file) {
                let urlFile;
                if (photoUserDatabase) {
                    urlFile = await this.firebase.updateFileFromFirebase(file, photoUserDatabase.storageReference, `profile/${entity.name}/${file.originalname}`);
                    await queryRunner.manager.update(photo_user_entity_1.PhotoUser, id, {
                        userId: id,
                        firebaseUrlFile: urlFile,
                        storageReference: `profile/${entity.name}/${file.originalname}`
                    });
                }
                else {
                    urlFile = await this.firebase.saveInFirebase(file, `profile/${entity.name}/${file.originalname}`);
                    await queryRunner.manager.save(photo_user_entity_1.PhotoUser, {
                        userId: id,
                        firebaseUrlFile: urlFile,
                        storageReference: `profile/${entity.name}/${file.originalname}`
                    });
                }
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
        }
    }
    async remove(id) {
        try {
            const photoUser = await this.repositoryPhoto.findOneBy({
                userId: id
            });
            if (photoUser) {
                await this.firebase.deleteFileFromFirebase(photoUser.storageReference);
            }
            await this.repository.delete({ id: id });
        }
        catch (error) {
            console.log(error);
        }
    }
    async bootstrapQueryRunner() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return queryRunner;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(1, (0, common_1.Inject)('EXCEPTIONS_POSTGREE')),
    __param(3, (0, common_1.Inject)('PHOTO_USER_REPOSITORY')),
    __param(4, (0, common_1.Inject)('DATA_SOURCE_DEV')),
    __metadata("design:paramtypes", [typeorm_1.Repository, Object, hash_data_service_1.HashDataService,
        typeorm_1.Repository,
        typeorm_1.DataSource,
        firebase_service_1.FirebaseService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map