import { ForbiddenException } from "@nestjs/common";
import { IHandler } from "./IHandleError";


export class PrimaryKeyErrorHandlePostgree implements IHandler {
    private nextHandler: IHandler;
  
    setNext(handler: IHandler): IHandler {
      this.nextHandler = handler;
      return handler;
    }
  
    handle(error ): void {
      if (error.code === '23505') {
        throw new ForbiddenException('Primary Key Violation')
      }
  
      if (this.nextHandler) {
        this.nextHandler.handle(error);
      }
    }
  }
  