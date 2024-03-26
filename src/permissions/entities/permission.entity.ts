import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.permission)
    @JoinColumn({name:"userId"})
    user: User;

    @Column({default: true})
    write: boolean;

    @Column({default: true})
    edit: boolean;

    @Column({default: true})
    delete: boolean;
    
}
