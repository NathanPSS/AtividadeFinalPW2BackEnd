import { IsEmail,IsNotEmpty,IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsStrongPassword()
    @IsNotEmpty()
    password: string
}
