import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Project } from '../model/project.entity'

export const projectRepository :Array<Provider> = [
    {
      provide: 'PROJECT_REPOSITORY',
      useFactory: (datasource :DataSource) => datasource.getRepository(Project),
      inject: ['DATA_SOURCE_DEV'],
    },
]