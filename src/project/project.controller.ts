import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards} from '@nestjs/common';
import { ProjectService } from './project.service';
import { FormProjectDto } from './dto/form-project.dto';
import { FastifyRequest } from 'fastify';
import { AuthJwtService } from '../auth/app-jwt/auth-jwt/auth-jwt.service';
import { File } from 'fastify-multer/lib/interfaces';
import { JwtGuardService } from '../auth/app-jwt/guards/jwt-guard/jwt-guard.service';



@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly jwt :AuthJwtService
    ) {}

  @Post()
  async create(@Request() req:FastifyRequest) {
    const id :any= await this.jwt.decode(req.headers.authorization)
    const createProjectDto = req.raw['body']
    const file :File = req.raw['file']
    console.log(file)
    console.log(id)
    console.log(createProjectDto)
  this.projectService.create(createProjectDto,id.username,file);
  return 1
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }
  
  @UseGuards(JwtGuardService)
  @Patch(':id')
  async update(@Param('id') id: string,@Request() req:FastifyRequest) {
    const idToken :any= await this.jwt.decode(req.headers.authorization)
    const file :File = req.raw['file']
    const bodyDto = req.raw['body']
    const updateProjectDto = {
       ...bodyDto,
       author:idToken.username,
       
    }
   
    return this.projectService.update(+id, updateProjectDto,file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  @Post('upload')
  saveInFirebase(@Request() req:FastifyRequest){
  //  console.log(req.raw['file'])
    const y:File = req.raw['file']
    console.log(y)
   // this.projectService.saveFirebase(req.raw['file'])
 return 1
  }
  
}
