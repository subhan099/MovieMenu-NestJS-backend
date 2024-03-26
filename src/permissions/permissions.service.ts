import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    let permission: Permission = new Permission();
    permission.user = createPermissionDto.user;
    const res = await this.permissionRepository.save(permission);
    return { message: 'created successfully', status: 'success', data: res };
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: number) {
    return this.permissionRepository.findOne({ where: { id } });
  }

  async findUser(userId: number) {
    const row = await this.permissionRepository.find({
      where: { user: { id: userId } },
    });
    return row;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permissionToUpdate = await this.permissionRepository.findOne({
      where: { id },
    });

    // console.log("================", permissionToUpdate);

    if (!permissionToUpdate) {
      return { message: 'entry not found', status: 'failure', data: [] };
    } else {
      if (updatePermissionDto.write) {
        permissionToUpdate.write = updatePermissionDto.write;
      }
      if (!updatePermissionDto.write) {
        permissionToUpdate.write = false;
      }

      if (updatePermissionDto.edit) {
        permissionToUpdate.edit = updatePermissionDto.edit;
      }
      if (!updatePermissionDto.edit) {
        permissionToUpdate.edit = false;
      }

      if (updatePermissionDto.delete) {
        permissionToUpdate.delete = updatePermissionDto.delete;
      }
      if (!updatePermissionDto.delete) {
        permissionToUpdate.delete = false;
      }

      // console.log("now=======>>>>>>>>>", permissionToUpdate)
      const res = await this.permissionRepository.save(permissionToUpdate);
      // console.log(res);
      return { message: 'updated successfully', status: 'success', data: res };
    }
  }

  remove(id: number) {
    return this.permissionRepository.delete(id);
  }
  
}
