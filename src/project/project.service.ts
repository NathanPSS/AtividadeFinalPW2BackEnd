import { Inject, Injectable } from '@nestjs/common';
import { FormProjectDto } from './dto/form-project.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { File } from 'fastify-multer/lib/interfaces';
import { DataSource, In, Repository } from 'typeorm';
import { Project } from './model/project.entity';
import { User } from '../user/model/user.entity';
import { HashDataService } from '../hash/hash-data/hash-data.service';
import { Attachment } from './model/attachment.entity';
import { PhotoUser } from '../user/model/photo-user.entity';



@Injectable()
export class ProjectService {
  constructor(

    private readonly firebase :FirebaseService,
    @Inject('PROJECT_REPOSITORY')
    private readonly repositoryProject :Repository<Project>,
    @Inject('USER_REPOSITORY')
    private readonly repositoryUser :Repository<User>,
    @Inject('PHOTO_USER_REPOSITORY')
    private readonly repositoryProfile :Repository<PhotoUser>,
    @Inject('ATTACHMENT_REPOSITORY')
    private readonly repositoryAttachment :Repository<Attachment>,
    @Inject('DATA_SOURCE_DEV')
    private readonly dataSource :DataSource,

  ){}
  async create(createProjectDto: FormProjectDto,author :number,file? :File) {
    let entity = {
      ...createProjectDto,
      author:author,
    }
     if(createProjectDto.collaborators){
      
      const collaborators = await this.repositoryUser.findBy({
        id:In(createProjectDto.collaborators)
       })
       entity.collaborators = collaborators
     }
      const queryRunner = await this.bootstrapQueryRunner()
      try {
        await queryRunner.manager.save(Project,entity)
        if(file){
          const urlFile = await this.firebase.saveInFirebase(file,`arquivos-anexos/${entity.title}/${file.originalname}`)
          const attachment = {
            project:entity,
            firebaseUrlFile: urlFile,
            storageReference: `arquivos-anexos/${entity.title}/${file.originalname}`
          }
          await queryRunner.manager.save(Attachment,attachment)
        }
        await queryRunner.commitTransaction()
      } catch (error) {
       await queryRunner.rollbackTransaction()
       await queryRunner.release()
      }
     }
  

  async findAll() {
    const projectsDatabase = await this.repositoryProject.find({
      relations:['author']
    })
    const projects = await Promise.all(
      projectsDatabase.map(async (value) => {
        const profileUserProject = await this.repositoryProfile.findOne({where:{userId :value.author['id']}})

        const attachment = await this.repositoryAttachment.findOne({ where: { projectId: value.id } });
        return {
          ...value,
          profile:profileUserProject,
          attachment: attachment
        };
      })
    );
    return projects
  }
  

  async findOne(id: number) {
    const attachment = await this.repositoryAttachment.findOne({
      where:{
      projectId:id
    },
    select:{
      firebaseUrlFile:true,
      storageReference:true
    }
  })
    const project =  await this.repositoryProject.findOne({loadRelationIds:true,where:{
       id:id
    }})
      return {
        ...project,
        attachment:attachment
      }
  }

  async update(idProject: number, updateProjectDto: FormProjectDto,file? :File) {
    const entity = {
      ...updateProjectDto,
      id:idProject
    }
   
    const attachmentDatabase = await this.repositoryAttachment.findOne({
      where:{
        projectId:entity.id
      }
    })
    const queryRunner = await this.bootstrapQueryRunner()
    try {
      await queryRunner.manager.save(Project,entity)
      if(file){
        let urlFile :string
        if(attachmentDatabase){
          urlFile = await this.firebase.updateFileFromFirebase(file,attachmentDatabase.storageReference,`arquivos-anexos/${entity.title}/${file.originalname}`) 
        } else {
          urlFile = await this.firebase.saveInFirebase(file,`arquivos-anexos/${entity.title}/${file.originalname}`) 
        }
        const attachment = {
          projectId:entity.id,
          firebaseUrlFile: urlFile,
          storageReference: `arquivos-anexos/${entity.title}/${file.originalname}`,
        }
        await queryRunner.manager.update(Attachment,attachment.projectId,attachment)
      }
      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
    }
  }

  async remove(id: number) {
    const attachment = await this.repositoryAttachment.findOneBy({
      projectId:id
    })
    if(attachment){
      await this.firebase.deleteFileFromFirebase(attachment.storageReference)
    }
    await this.repositoryProject.delete({id:id})
  }
  saveFirebase(file :any) {
  //  this.firebase.saveInFirebase(file)
  }

  async bootstrapQueryRunner() {
  const queryRunner = this.dataSource.createQueryRunner()
     await queryRunner.connect()
     await queryRunner.startTransaction()
     return queryRunner
  }
}
