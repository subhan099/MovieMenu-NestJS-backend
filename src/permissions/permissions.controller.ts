import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @UseGuards(new RoleGuard(Constants.Roles.ADMIN_ROLE))
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @UseGuards(new RoleGuard(Constants.Roles.ADMIN_ROLE))
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @UseGuards(new RoleGuard(Constants.Roles.ADMIN_ROLE))
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Get('/user/:userId')                 //give userId to get all his permissions
  findUser(@Param('userId') userId: string) {
    return this.permissionsService.findUser(+userId);
  }

  @Patch(':id')
  @UseGuards(new RoleGuard(Constants.Roles.ADMIN_ROLE))
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @UseGuards(new RoleGuard(Constants.Roles.ADMIN_ROLE))
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }

}
