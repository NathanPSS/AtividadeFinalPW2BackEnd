import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';


export const queryRunnerProvider :Provider  = 
    {
      provide: 'QUERY_RUNNER',
      inject: ['DATA_SOURCE_DEV'],
      useFactory:async (dataSource :DataSource) => {
        const queryRunner = dataSource.createQueryRunner()
        await queryRunner.connect()
        return queryRunner
      }
    }
