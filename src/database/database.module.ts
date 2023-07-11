import { Module } from '@nestjs/common';
import { dataBaseProviders } from './databaseProviders/database.providers';
import { queryRunnerProvider } from './query.runner';

;

@Module({
  providers: [...dataBaseProviders,queryRunnerProvider],
  exports: [...dataBaseProviders,queryRunnerProvider],
  imports: []
})
export class DatabaseModule {}
