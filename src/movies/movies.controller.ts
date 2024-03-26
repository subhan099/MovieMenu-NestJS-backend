import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body(ValidationPipe) createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'image' corresponds to the field name in the form-data
  async uploadFile(
    @UploadedFile() file,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    // Use createMovieDto to get other movie details
    return this.moviesService.createMovie(createMovieDto, file);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
  //     return this.moviesService.update(+id, updateMovieDto);
  //   }

//   @Patch(':id')
//   @UseInterceptors(FilesInterceptor('image')) // Assuming 'image' corresponds to the field name in the form-data
//   async updateMovie(
//     @Param('id') id: string,
//     @Body() updateMovieDto: UpdateMovieDto,
//     @UploadedFiles() files, // Use UploadedFiles to handle multiple files
//   ) {
//     return this.moviesService.updateMovie(+id, updateMovieDto, files);
//   }

@Patch(':id')
@UseInterceptors(FilesInterceptor('files')) // Assuming the field name for files is 'files'
async updateMovie(
  @Param('id') id: number,
  @Body() updateMovieDto: UpdateMovieDto,
  @UploadedFiles() files // Retrieve uploaded files
) {
  return this.moviesService.updateMovie(id, updateMovieDto, files);
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
