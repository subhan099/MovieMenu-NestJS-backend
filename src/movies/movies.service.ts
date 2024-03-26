import { Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    let movie: Movie = new Movie();
    movie.name = createMovieDto.name;
    movie.year = createMovieDto.year;
    const existingMovie = await this.movieRepository.findOne({
      where: { name: movie.name },
    });
    if (existingMovie) {
      return {
        message: 'movie name already exits',
        status: 'failure',
        data: [],
      };
    } else {
      const res = await this.movieRepository.save(movie);
      return { message: 'Movie created', status: 'success', data: res };
    }
  }

  async createMovie(createMovieDto: CreateMovieDto, file) {
    // console.log('file is as: ', file);
    const { name, year } = createMovieDto;
    const imagePath = file.filename;
    const existingMovie = await this.movieRepository.findOne({
      where: { name },
    });
    if (existingMovie) {
      return { message: 'movie already exists', status: 'failure', data: [] };
    } else {
      const movie = this.movieRepository.create({ name, year, imagePath });
      return this.movieRepository.save(movie);
    }
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: number) {
    return this.movieRepository.findOne({ where: { id } });
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto, files) {
    const movieToUpdate = await this.movieRepository.findOne({ where: { id } });
    if (!movieToUpdate) {
      return { message: 'Movie does not exist', status: 'failure', data: [] };
    }
  
    if (updateMovieDto.name) {
      movieToUpdate.name = updateMovieDto.name;
    }
  
    if (updateMovieDto.year) {
      movieToUpdate.year = parseInt(updateMovieDto.year, 10);
    }
  
    
    if (files && files.length > 0) {
      const file = files[0];
      movieToUpdate.imagePath = file.filename;
    }
  
    const updatedMovie = await this.movieRepository.save(movieToUpdate);
  
    return {
      message: 'Movie updated successfully',
      status: 'success',
      data: updatedMovie,
    };
  }
  

  async remove(id: number) {
    const found = await this.movieRepository.findOne({ where: { id } });
    if (found) {
      const res = this.movieRepository.delete(id);
      return { message: 'deleted successfully', status: 'success', data: res };
    } else {
      return { message: 'could not find movie', status: 'failure', data: [] };
    }
  }
}
