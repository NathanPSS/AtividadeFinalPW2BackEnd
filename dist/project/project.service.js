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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./model/project.entity");
const attachment_entity_1 = require("./model/attachment.entity");
let ProjectService = class ProjectService {
    constructor(firebase, repositoryProject, repositoryUser, repositoryProfile, repositoryAttachment, dataSource) {
        this.firebase = firebase;
        this.repositoryProject = repositoryProject;
        this.repositoryUser = repositoryUser;
        this.repositoryProfile = repositoryProfile;
        this.repositoryAttachment = repositoryAttachment;
        this.dataSource = dataSource;
    }
    async create(createProjectDto, author, file) {
        let entity = Object.assign(Object.assign({}, createProjectDto), { author: author });
        if (createProjectDto.collaborators) {
            const collaborators = await this.repositoryUser.findBy({
                id: (0, typeorm_1.In)(createProjectDto.collaborators)
            });
            entity.collaborators = collaborators;
        }
        const queryRunner = await this.bootstrapQueryRunner();
        try {
            await queryRunner.manager.save(project_entity_1.Project, entity);
            if (file) {
                const urlFile = await this.firebase.saveInFirebase(file, `arquivos-anexos/${entity.title}/${file.originalname}`);
                const attachment = {
                    project: entity,
                    firebaseUrlFile: urlFile,
                    storageReference: `arquivos-anexos/${entity.title}/${file.originalname}`
                };
                await queryRunner.manager.save(attachment_entity_1.Attachment, attachment);
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
        }
    }
    async findAll() {
        const projectsDatabase = await this.repositoryProject.find({
            relations: ['author']
        });
        const projects = await Promise.all(projectsDatabase.map(async (value) => {
            const profileUserProject = await this.repositoryProfile.findOne({ where: { userId: value.author['id'] } });
            const attachment = await this.repositoryAttachment.findOne({ where: { projectId: value.id } });
            return Object.assign(Object.assign({}, value), { profile: profileUserProject, attachment: attachment });
        }));
        return projects;
    }
    async findOne(id) {
        const attachment = await this.repositoryAttachment.findOne({
            where: {
                projectId: id
            },
            select: {
                firebaseUrlFile: true,
                storageReference: true
            }
        });
        const project = await this.repositoryProject.findOne({ loadRelationIds: true, where: {
                id: id
            } });
        return Object.assign(Object.assign({}, project), { attachment: attachment });
    }
    async update(idProject, updateProjectDto, file) {
        const entity = Object.assign(Object.assign({}, updateProjectDto), { id: idProject });
        const attachmentDatabase = await this.repositoryAttachment.findOne({
            where: {
                projectId: entity.id
            }
        });
        const queryRunner = await this.bootstrapQueryRunner();
        try {
            await queryRunner.manager.save(project_entity_1.Project, entity);
            if (file) {
                let urlFile;
                if (attachmentDatabase) {
                    urlFile = await this.firebase.updateFileFromFirebase(file, attachmentDatabase.storageReference, `arquivos-anexos/${entity.title}/${file.originalname}`);
                }
                else {
                    urlFile = await this.firebase.saveInFirebase(file, `arquivos-anexos/${entity.title}/${file.originalname}`);
                }
                const attachment = {
                    projectId: entity.id,
                    firebaseUrlFile: urlFile,
                    storageReference: `arquivos-anexos/${entity.title}/${file.originalname}`,
                };
                await queryRunner.manager.update(attachment_entity_1.Attachment, attachment.projectId, attachment);
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
        }
    }
    async remove(id) {
        const attachment = await this.repositoryAttachment.findOneBy({
            projectId: id
        });
        if (attachment) {
            await this.firebase.deleteFileFromFirebase(attachment.storageReference);
        }
        await this.repositoryProject.delete({ id: id });
    }
    saveFirebase(file) {
    }
    async bootstrapQueryRunner() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return queryRunner;
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('PROJECT_REPOSITORY')),
    __param(2, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(3, (0, common_1.Inject)('PHOTO_USER_REPOSITORY')),
    __param(4, (0, common_1.Inject)('ATTACHMENT_REPOSITORY')),
    __param(5, (0, common_1.Inject)('DATA_SOURCE_DEV')),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map