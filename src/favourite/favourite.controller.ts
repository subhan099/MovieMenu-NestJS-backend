import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';

interface CustomRequest extends Request {
  user: {
    userId: number;
  };
  favourite: {
    favouriteId: number;
  };
}

@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  // @Post()
  // create(@Body() createFavouriteDto: CreateFavouriteDto) {
  //   return this.favouriteService.create(createFavouriteDto);
  // }

  @Post()
  // create(@Body() body: { movieId: number }, @Req() request: CustomRequest) {
  create(@Body() body: { userId: number; movieId: number }) {
    // const userId = request.user.userId;
    const userId = body.userId;
    const movieId = body.movieId;
    return this.favouriteService.create(userId, movieId);
  }

  @Get()
  findAll() {
    return this.favouriteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favouriteService.findOne(+id);
  }
  @Get('/user/:userId')               //give userId to get all the favourite movies Id
  findfavourites(@Param('userId') userId: number) {
    return this.favouriteService.findfavourite(+userId);
  }

  @Get('/movie/:movieId/user/:userId')
  findId(@Param('movieId') movieId: number, @Param('userId') userId: number) {
    return this.favouriteService.findIdByMovieIdAndUserId(movieId, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favouriteService.remove(+id);
  }
  
  @Delete('/movie/:id')                   //give movieId to delete the movie from both favourites and movies table 
  removeUserandMovie(@Param('id') id: string) {
    return this.favouriteService.removeUserandMovie(+id);
  } 
}
