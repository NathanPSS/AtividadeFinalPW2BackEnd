import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<import("@nestjs/mapped-types/dist/types/remove-fields-with-type.type").RemoveFieldsWithType<Partial<CreateUserDto>, Function>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    phone?: string;
    github?: string;
    bio?: string;
}
export {};
