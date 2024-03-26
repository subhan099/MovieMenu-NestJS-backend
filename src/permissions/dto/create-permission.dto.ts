import { IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreatePermissionDto {
    write: boolean;
    edit: boolean;
    delete: boolean;
    user: User;
}
