import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class MulterMiddleware implements NestMiddleware {
    private upload;
    use(req: Request, res: Response, next: NextFunction): void;
}
