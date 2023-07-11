import { ForbiddenException } from "@nestjs/common";
import { IHandler } from "./IHandleError";

export class UniqueErrorHandlePostgree implements IHandler {
    private nextHandler: IHandler;
  
    setNext(handler: IHandler): IHandler {
      this.nextHandler = handler;
      return handler;
    }
  
    handle(error ): void {
      if (error.code === '23000') {
        throw new ForbiddenException('Unique Constraint Violation')
      }
  
      if (this.nextHandler) {
        this.nextHandler.handle(error);
      }
    }
  }
  