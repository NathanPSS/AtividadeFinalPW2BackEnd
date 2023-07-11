import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FastifyRequest } from 'fastify';
import * as multer from 'multer';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  private upload = multer().single('file');

  use(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, next);
     
  }
}