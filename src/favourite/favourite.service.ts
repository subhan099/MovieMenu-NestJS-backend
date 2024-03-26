import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favourite } from './entities/favourite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { UserService } from 'src/user/user.service';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class FavouriteService {
  // create(createFavouriteDto: CreateFavouriteDto) {
  //   return 'This action adds a new favourite';
  // }
  constructor(
    @InjectRepository(Favourite)
    private readonly favouriteRepository: Repository<Favourite>,
    private userService: UserService,
    private movieService: MoviesService,
  ) {}

  async create(userId: number, movieId: number) {
    let newEntry: Favourite = new Favourite();
    const u_id = await this.userService.findOne(userId);
    const m_id = await this.movieService.findOne(movieId);
    newEntry.user = new User();
    newEntry.movie = new Movie();
    newEntry.user.id = u_id.id;
    newEntry.movie.id = m_id.id;
    const result = await this.favouriteRepository.save(newEntry);
    if (result) {
      return {
        message: 'movie added successfully',
        status: 'success',
        data: result,
      };
    } else {
      return {
        message: 'could not add movie',
        status: 'failure',
        data: [],
      };
    }
  }

  findAll() {
    return this.favouriteRepository.find({ relations: ['user', 'movie'] });
  }

  findOne(id: number) {
    return this.favouriteRepository.find({
      where: { id },
      relations: ['user', 'movie'],
    });
  }

  async findfavourite(userId: number): Promise<number[]> {
    const favourites = await this.favouriteRepository.find({
      where: { user: { id: userId } },
      relations: ['movie'], // Ensure the 'movie' relation is loaded
    });

    // Extract movie IDs from the fetched favourites
    const movieIds = favourites.map(favourite => favourite.movie.id);
    return movieIds;
  }
  
  async findIdByMovieIdAndUserId(movieId: number, userId: number): Promise<Favourite>{
    const id = await this.favouriteRepository.findOne({
      where: { 
        movie: { id: movieId },
        user: { id: userId }
      },
    });
    console.log("id: ", id);
    return id;
  }
  
  async remove(id: number) {
    const check = await this.favouriteRepository.findOne({ where: { id } });

    if (check) {
      const del = this.favouriteRepository.delete(id);
      return { message: 'deleted successfully', status: 'success', data: del };
    } else {
      return { message: 'user does not exist', status: 'failure', data: [] };
    }
  }

  // async removeUserandMovie(movieId: number) {
  //   const rows = await this.favouriteRepository.find({
  //     where: { movie: { id: movieId } },
  //   });
  //   console.log(rows);
    
  //   for (const row of rows) {
  //     await this.remove(row.id);
  //   }
    
  //   const res = await this.movieService.remove(movieId);
  //   return res;
  // }

  async removeUserandMovie(movieId: number) {
    await this.favouriteRepository.delete({ movie: { id: movieId } });
    
    const res = await this.movieService.remove(movieId);
    return res;
  }
  
}
