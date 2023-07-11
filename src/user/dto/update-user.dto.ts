import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsPhoneNumber('BR')
    phone?:string

    @IsString()
    github?: string

    @IsString()
    bio?: string
}
