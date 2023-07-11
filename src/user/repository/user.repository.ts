import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { User } from '../model/user.entity'

export const userRepository :Array<Provider> = [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (datasource :DataSource) => datasource.getRepository(User),
      inject: ['DATA_SOURCE_DEV'],
    },
]