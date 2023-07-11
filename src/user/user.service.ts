import { IDatabaseExeptions } from '../database/database-execeptions/IDatabaseExceptions';
import { HashDataService } from '../hash/hash-data/hash-data.service';
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { File } from 'fastify-multer/lib/interfaces';
import { PhotoUser } from './model/photo-user.entity';
import { Project } from '../project/model/project.entity';

@Injectable()
export class UserService{

  constructor(
   @Inject('USER_REPOSITORY')
   private repository: Repository<User>,

   @Inject('EXCEPTIONS_POSTGREE')
   private exceptions :IDatabaseExeptions,
   
   private hash :HashDataService,

   @Inject('PHOTO_USER_REPOSITORY')
   private readonly repositoryPhoto :Repository<PhotoUser>,

   @Inject('DATA_SOURCE_DEV')
   private readonly dataSource: DataSource,



   private readonly firebase :FirebaseService
  ){}

  async create(createUserDto: CreateUserDto){
    createUserDto.password = await this.hash.hashData(createUserDto.password,10)
    try { 
   await this.repository.save(createUserDto)
} catch (error) {
  this.exceptions.checkError(error);
}
  }

 async findAll() {
  try {
    return await this.repository.find() 
  } catch (error) {
    this.exceptions.checkError(error);
  }
  }

 async findOne(id: number) {
    try {
      const user = await this.repository.findOneByOrFail({
        id:id
      })
      const profile = await this.repositoryPhoto.findOneBy({
        userId:id
      })
      return {
        ...user,
        profile:profile
      }
    } catch (error) {
      return new NotFoundException()
    }
  }

 async update(updateUserDto: any,id :number,file?:File) {
  const entity = {
    ...updateUserDto,
    id:id
  }
  const photoUserDatabase = await this.repositoryPhoto.findOne({
    where:{
      userId:id
    }
  })
  const queryRunner = await this.bootstrapQueryRunner()
  try {
    await queryRunner.manager.save(User,entity)
    if(file){
      let urlFile :string
      if(photoUserDatabase){
        urlFile = await this.firebase.updateFileFromFirebase(file,photoUserDatabase.storageReference,`profile/${entity.name}/${file.originalname}`) 
        await queryRunner.manager.update(PhotoUser,id,{ 
          userId:id,
          firebaseUrlFile: urlFile,
          storageReference: `profile/${entity.name}/${file.originalname}`
        })
      } else {
        urlFile = await this.firebase.saveInFirebase(file,`profile/${entity.name}/${file.originalname}`) 
        await queryRunner.manager.save(PhotoUser,{
          userId:id,
          firebaseUrlFile: urlFile,
          storageReference: `profile/${entity.name}/${file.originalname}`
        })
      }
    }
    await queryRunner.commitTransaction()
  } catch (error) {
    console.log(error)
    await queryRunner.rollbackTransaction()
    await queryRunner.release()
  }
  }

 async remove(id :number) {
    try {
      const photoUser = await this.repositoryPhoto.findOneBy({
        userId:id
      })
      if(photoUser){
        await this.firebase.deleteFileFromFirebase(photoUser.storageReference)
      }

      await this.repository.delete({id:id})
    } catch (error) {
      console.log(error)
    }
  }

  async bootstrapQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner()
       await queryRunner.connect()
       await queryRunner.startTransaction()
       return queryRunner
    }
}
