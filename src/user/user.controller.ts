import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalUserGuardService } from './auth-user/guards/local-user-guard.service';
import  { Request as ExpressRequest } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuardService } from '../auth/app-jwt/guards/jwt-guard/jwt-guard.service';
import { AuthJwtService } from '../auth/app-jwt/auth-jwt/auth-jwt.service';
import { FastifyRequest } from 'fastify';
import { File } from 'fastify-multer/lib/interfaces';



@Controller('user')
export class UserController{
  constructor(
    private readonly userService: UserService,
    private readonly jwt :AuthJwtService
    ) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {

    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalUserGuardService)
  @Post('login')
  async login(@Request() req:any){
   return await this.jwt.login(req.user)
  }

  @UseGuards(JwtGuardService)
  @Get()
  async findOne(@Request() req:FastifyRequest) {
    const id :any= await this.jwt.decode(req.headers.authorization)
   
    return this.userService.findOne(id.username);
  }

  @UseGuards(JwtGuardService)
  @Get('/all')
  async findAll() {
   
    return this.userService.findAll();
  }
  @UseGuards(JwtGuardService)
  @Patch()
  async update(@Request() req :FastifyRequest) {

    const id :any= await this.jwt.decode(req.headers.authorization)
    const file : File = req.raw['file']
    const userUpdate = req.raw['body']
    return this.userService.update(userUpdate,+id.username,file);
  }

  @UseGuards(JwtGuardService)
  @Delete()
  async remove(@Request() req :FastifyRequest) {
    
    const id :any= await this.jwt.decode(req.headers.authorization)
    return this.userService.remove(+id.username);
  }
}
