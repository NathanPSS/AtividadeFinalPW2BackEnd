import { NotFoundException } from "@nestjs/common";
import { EntityNotFoundError } from "typeorm";
import { IHandler } from "./IHandleError";

export class NotFoundErrorHandlePostgree implements IHandler {
    private nextHandler: IHandler;
  
    setNext(handler: IHandler): IHandler {
      this.nextHandler = handler;
      return handler;
    }
  
    handle(error): void {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Not Found the Data')
      }
  
      if (this.nextHandler) {
        this.nextHandler.handle(error);
      }
    }
  }
  