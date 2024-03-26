import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login.dto';
import { Constants } from 'src/utils/constants';
import { PermissionsService } from 'src/permissions/permissions.service';
import { CreatePermissionDto } from 'src/permissions/dto/create-permission.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private permissionService: PermissionsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.Roles.NOMAL_USER_ROLE;
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingUser) {
      return { message: 'email already exists', status: 'failure', data: [] };
    } else {
      const res = await this.userRepository.save(user);
      const createPermissionDto: CreatePermissionDto = {
        write:true,
        edit:true,
        delete:true,
        user: res
      };
      
      const user_permission = await this.permissionService.create(createPermissionDto)
      // console.log("res defined id :     ", res)
      return { message: 'registered', status: 'success', data: res };
    }
  }

  async login(loginUserDto: LoginUserDto) {
    let user: User = new User();
    user.email = loginUserDto.email;
    user.password = loginUserDto.password;
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingUser) {
      if (user.password === existingUser.password) {
        return { message: 'login successful', status: 'success', data: existingUser.id };
      } else {
        return { message: 'cannot login', status: 'failure', data: [] };
      }
    }
    else{ 
      return { message: 'user not found', status: 'failure', data: [] }
    }
    console.log("================>>>>>>>>>>>>", existingUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const found = await this.userRepository.findOne({ where: { id } });
    if (found) {
      const res = await this.userRepository.delete(id);
      return { message: 'deleted successfully', status: 'success', data: res };
    } else {
      return { message: 'user does not exist', status: 'failure', data: [] };
    }
  }
}
