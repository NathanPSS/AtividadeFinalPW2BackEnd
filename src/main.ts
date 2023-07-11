
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as multerFastify from 'fastify-multer'
import cors from '@fastify/cors'


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.register(multerFastify.contentParser)
 
  await app.register(cors,{
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST','PATCH','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
