import { IHandler } from "./IHandleError";
export declare class ForeingKeyErrorHandlePostgree implements IHandler {
    private nextHandler;
    setNext(handler: IHandler): IHandler;
    handle(error: any): void;
}
