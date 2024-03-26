import { Movie } from "src/movies/entities/movie.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favourite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User;

    @ManyToOne(() => Movie)
    @JoinColumn({name: "movieId"})
    movie: Movie
}
