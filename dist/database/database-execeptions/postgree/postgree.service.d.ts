import { Provider } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { IDatabaseExeptions } from '../IDatabaseExceptions';
export declare class ExecptionsPostgreeService implements IDatabaseExeptions {
    checkError(error: QueryFailedError): void;
    private factoryHandlers;
}
export declare const execptionsPostgreeService: Provider;
