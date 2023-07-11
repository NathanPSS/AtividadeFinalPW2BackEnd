import { ForbiddenException } from "@nestjs/common";
import { IHandler } from "./IHandleError";


export class ForeingKeyErrorHandlePostgree implements IHandler {
    private nextHandler: IHandler;
  
    setNext(handler: IHandler): IHandler {
      this.nextHandler = handler;
      return handler;
    }
  
    handle(error): void {
      if (error.code === '25003') {
        throw new ForbiddenException('Foreing Key Violation')
      }
  
      if (this.nextHandler) {
        this.nextHandler.handle(error);
      }
    }
  }
  