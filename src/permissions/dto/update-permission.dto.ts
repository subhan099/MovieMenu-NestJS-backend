import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { IsOptional } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    @IsOptional()
    write: boolean;

    @IsOptional()
    edit: boolean;

    @IsOptional()
    delete: boolean;
}
