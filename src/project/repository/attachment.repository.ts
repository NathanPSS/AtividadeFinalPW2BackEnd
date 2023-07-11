import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Attachment } from '../model/attachment.entity'

export const attachmentRepository :Array<Provider> = [
    {
      provide: 'ATTACHMENT_REPOSITORY',
      useFactory: (datasource :DataSource) => datasource.getRepository(Attachment),
      inject: ['DATA_SOURCE_DEV'],
    },
]