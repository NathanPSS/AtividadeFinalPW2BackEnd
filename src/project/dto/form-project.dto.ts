import { Transform } from "class-transformer";
import { IsArray, IsEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class FormProjectDto {

    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    github?: string

    @IsString()
    @IsOptional()
    prototype?: string

    @IsString()
    @IsOptional()
    gpWhatzap?: string

    @IsArray()
    @IsOptional()
    collaborators?: Array<any>
}
