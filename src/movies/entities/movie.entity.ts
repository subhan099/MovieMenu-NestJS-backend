import { Favourite } from 'src/favourite/entities/favourite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn  } from 'typeorm';


@Entity()
export class Movie {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true }) 
  imagePath: string;

  // @OneToMany(() => Favourite, favourite => favourite.movie, { onDelete: 'CASCADE' })
  // favourites: Favourite[];

  @OneToMany(() => Favourite, favourite => favourite.movie, { cascade: true })
  favorites: Favourite[];
}


