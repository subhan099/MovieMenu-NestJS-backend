import { IsOptional } from 'class-validator';
import { Permission } from 'src/permissions/entities/permission.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsOptional()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  role: string;

  @OneToMany(() => Permission, (permission) => permission.user)
  permission: Permission[];
}
