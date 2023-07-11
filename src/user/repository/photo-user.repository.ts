import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { PhotoUser } from '../model/photo-user.entity'


export const photoUserRepository :Array<Provider> = [
    {
      provide: 'PHOTO_USER_REPOSITORY',
      useFactory: (datasource :DataSource) => datasource.getRepository(PhotoUser),
      inject: ['DATA_SOURCE_DEV'],
    },
]