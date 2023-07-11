import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { User } from '../model/user.entity'

export const userRepository :Array<Provider> = [
    {
      provide: 'USER_REPOSITORY_TEST',
      useFactory: (datasource :DataSource) => datasource.getRepository(User),
      inject: ['DATA_SOURCE_TEST'],
    },
]